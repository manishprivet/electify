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
		case 'PUT':
			{
				let { election_id, voter_id, voter_secret, c_index } = req.body;
				if (!election_id || !voter_id || !voter_secret || c_index === undefined)
					return res.status(400).json({ success: false, error: 'Incomplete Params' });
				election_id = election_id.toLowerCase();
				const getParams = {
					TableName: table,
					Key: { election_id }
				};
				docClient.get(getParams, async function(err, data) {
					if (err) return error(err, res);
					if (data.Item) {
						const index = data.Item.voters.findIndex((voter) => voter.voter_id === voter_id);
						if (index === -1) return res.json({ success: false, error: 'Wrong Voter ID' });
						if (c_index >= data.Item.candidates.length)
							return res.json({ success: false, error: 'Bad Candidate' });
						if (data.Item.voters[index].voter_secret === voter_secret) {
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

export const config = {
	api: {
		externalResolver: true
	}
};
