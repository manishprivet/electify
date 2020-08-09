import AWS, { AWSError } from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

AWS.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: "us-east-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "electify";
const pattern = /^[a-zA-Z]+$/;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      {
        try {
          let {
            display_name,
            election_name,
            no_of_voters,
            candidates,
            auth_type,
            emails,
            gsuite_domain,
          } = req.body;
          if (
            !display_name ||
            !election_name ||
            no_of_voters > 10000 ||
            !pattern.test(election_name) ||
            !auth_type ||
            (auth_type === "secret" &&
              !/^\d+$/.test(no_of_voters) &&
              !no_of_voters) ||
            (auth_type === "google" && !emails) ||
            (auth_type === "gsuite" && !gsuite_domain)
          )
            return res.status(400).json({ success: false, error: false });
          election_name = election_name.toLowerCase();
          if (auth_type === "google") {
            emails = emails.split(" ").join("");
            emails = emails.toLowerCase();
            emails = emails.slice(-1) === "," ? emails.slice(0, -1) : emails;
          }
          const response = await createElection(
            display_name,
            election_name,
            no_of_voters,
            candidates,
            auth_type,
            emails,
            gsuite_domain,
            0
          );
          res.json(response);
        } catch (err) {
          return error(err, res);
        }
      }
      break;
    default:
      return res.status(405).json({ success: false, error: false });
  }
};

function createElection(
  display_name: string,
  election_name: string,
  no_of_voters: number,
  candidates: any,
  auth_type: string,
  emails: string,
  gsuite_domain: string,
  count: number
) {
  return new Promise(async (resolve, reject) => {
    const election_id = election_name + "-" + generateRowId(1);
    const getParams = {
      TableName: table,
      Key: { election_id },
    };
    if (count >= 10) return resolve({ success: false, error: false });
    docClient.get(getParams, async function (err, data) {
      if (err) reject(err);
      if (data.Item) {
        const response = await createElection(
          display_name,
          election_name,
          no_of_voters,
          candidates,
          auth_type,
          emails,
          gsuite_domain,
          count + 1
        );
        resolve(response);
      } else {
        let voters = [];
        if (auth_type === "secret") {
          const wordsData = await fetch(
            `https://random-word-api.herokuapp.com/word?number=${no_of_voters}&swear=0`
          );
          const words = await wordsData.json();
          for (let i = 0; i < no_of_voters; i++)
            voters.push({
              voter_id: election_name + "-" + i,
              voter_secret: election_name + "-" + words[i],
            });
        } else if (auth_type === "gsuite") voters = [gsuite_domain];
        else voters = emails.split(",");
        candidates.forEach((candidate: any) => (candidate.votes = 0));
        const now = new Date();
        const expiration_time = Math.floor(now.getTime() / 1000) + 604800;
        const putParams = {
          TableName: table,
          Item: {
            election_id,
            voters,
            display_name,
            expiration_time,
            candidates,
            auth_type,
            voted: [],
          },
        };
        docClient.put(putParams, function (err, _) {
          if (err) reject(err);
          return resolve({
            success: true,
            election_id,
            display_name,
            voters,
            candidates,
            expiration_time,
            auth_type,
          });
        });
      }
    });
  });
}

const error = (err: AWSError, res: NextApiResponse) => {
  console.log(err);
  res.json({ success: false, error: true });
};

function generateRowId(shardId: number) {
  let ts = new Date().getTime() % 10000; // limit to recent
  let randid = Math.floor(Math.random() * 512);
  ts = ts * 64; // bit-shift << 6
  ts = ts + shardId;
  return ts + (randid % 512);
}

export const config = {
  api: {
    externalResolver: true,
  },
};
