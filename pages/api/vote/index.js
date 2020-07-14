import AWS from 'aws-sdk';
const { OAuth2Client, auth } = require('google-auth-library');
const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

AWS.config.update({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
	region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'electify';

export default async (req, res) => {
	switch (req.method) {
		case 'PUT':
			{
				let { election_id, voter_id, voter_secret, c_index, auth_type, token_id } = req.body;
				if (
					!election_id ||
					c_index === undefined ||
					!auth_type ||
					(auth_type == 'secret' && !voter_id && !voter_secret) ||
					(auth_type == 'google' || ('gsuite' && !token_id))
				)
					return res.status(400).json({ success: false, error: 'Incomplete Params' });
				election_id = election_id.toLowerCase();
				const getParams = {
					TableName: table,
					Key: { election_id }
				};
				docClient.get(getParams, async function(err, data) {
					if (err) return error(err, res);
					if (data.Item) {
						let index = 0;
						if (auth_type === 'secret')
							index = data.Item.voters.findIndex((voter) => voter.voter_id === voter_id);
						else {
							const { email } = await verifyIdToken(token_id);
							index = data.Item.voters.indexOf(email);
						}
						if (index === -1)
							return res.json({
								success: false,
								error: auth_type === 'secret' ? 'Wrong Voter ID' : 'Wrong Email Address'
							});
						if (c_index >= data.Item.candidates.length)
							return res.json({ success: false, error: 'Bad Candidate' });
						if (auth_type !== 'secret' || data.Item.voters[index].voter_secret === voter_secret) {
							data.Item.voters.splice(index, 1);
							const updateParams = {
								TableName: table,
								Key: { election_id },
								UpdateExpression: `set voters = :r, candidates[${c_index}].votes=:p`,
								ExpressionAttributeValues: {
									':r': data.Item.voters,
									':p': data.Item.candidates[c_index].votes + 1
								},
								ReturnValues: 'UPDATED_NEW'
							};
							return docClient.update(updateParams, function(err, data) {
								if (err) return error(err, res);
								return res.json({ success: true });
							});
						}
						return res.json({ success: false, error: 'Wrong Voter Secret' });
					}
					return res.json({ success: false, error: 'Wrong Election ID' });
				});
			}
			break;
		default:
			return res.status(405).json({ success: false, error: false });
	}
};

const error = (err, res) => {
	console.log(err);
	res.json({ success: false, error: true });
};

function verifyIdToken(token) {
	return new Promise(async (resolve, reject) => {
		try {
			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
				// Or, if multiple clients access the backend:
				//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
			});
			const payload = ticket.getPayload();
			const userid = payload['sub'];
			resolve(payload);
			console.log(payload, userid);
		} catch (err) {
			reject(err);
		}
	});
}

export const config = {
	api: {
		externalResolver: true
	}
};
