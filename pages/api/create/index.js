import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'electify';

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			{
				try {
					const { election_name, no_of_voters } = req.body;
					const response = await createElection(election_name, no_of_voters, 0);
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

function createElection(election_name, no_of_voters, count) {
	return new Promise(async (resolve, reject) => {
		const election_id = election_name + '-' + generateRowId(1);
		const getParams = {
			TableName: table,
			Key: { election_id }
		};
		if (count >= 10) return resolve({ success: false, error: false });
		docClient.get(getParams, async function(err, data) {
			if (err) reject(err);
			if (data.Item) {
				const response = await createElection(election_name, no_of_voters, count + 1);
				resolve(response);
			} else {
				const voters = [];
				for (let i = 0; i < no_of_voters; i++)
					voters.push(election_name + '-' + generateRowId(123) + '-' + generateRowId(769));
				const now = new Date();
				const expiration_time = Math.floor(now.getTime() / 1000) + 604800;
				const putParams = {
					TableName: table,
					Item: { election_id, voters, expiration_time }
				};
				docClient.put(putParams, function(err, _) {
					if (err) reject(err);
					return resolve({ success: true, election_id, voters });
				});
			}
		});
	});
}

const error = (err, res) => {
	console.log('ERROR', err);
	res.json({ success: false, error: true });
};

function generateRowId(shardId) {
	let ts = new Date().getTime() % 10000; // limit to recent
	let randid = Math.floor(Math.random() * 512);
	ts = ts * 64; // bit-shift << 6
	ts = ts + shardId;
	return ts + randid % 512;
}

export const config = {
	api: {
		externalResolver: true
	}
};
