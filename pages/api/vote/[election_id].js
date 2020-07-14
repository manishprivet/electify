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
		case 'GET':
			{
				let { election_id } = req.query;
				if (!election_id) return res.status(400).json({ success: false, error: false });
				election_id = election_id.toLowerCase();
				const getParams = {
					TableName: table,
					Key: { election_id }
				};
				docClient.get(getParams, async function(err, data) {
					if (err) return error(err, res);
					if (data.Item) {
						return res.json({
							success: true,
							display_name: data.Item.display_name,
							candidates: data.Item.candidates,
							expiration_time: data.Item.expiration_time,
							total_votes: totalVotes(data.Item.candidates),
							voters_remaining: data.Item.voters.length
						});
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

const totalVotes = (candidates) => {
	let total = 0;
	candidates.forEach((candidate) => (total += candidate.votes));
	return total;
};

export const config = {
	api: {
		externalResolver: true
	}
};
