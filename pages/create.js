import { useState } from 'react';
import Layout from '../components/Layout';
import ElectionCreated from '../components/ElectionCreated';
import CreateElection from '../components/CreateElection';
import Spinner from '../components/Spinner';

const sampleVoterData = {
	candidates: [ { name: 'Manish', votes: 0 }, { name: 'Suyog', votes: 5 } ],
	display_name: 'CR Elections',
	election_id: 'test-7593',
	success: true,
	voters: [
		{ voter_id: 'test-0', voter_secret: 'test-35454-32211' },
		{ voter_id: 'test-1', voter_secret: 'test-35454-32211' },
		{ voter_id: 'test-2', voter_secret: 'test-35454-32211' },
		{ voter_id: 'test-3', voter_secret: 'test-35454-32211' },
		{ voter_id: 'test-4', voter_secret: 'test-35454-32211' },
		{ voter_id: 'test-5', voter_secret: 'test-35454-32211' },
		{ voter_id: 'test-6', voter_secret: 'test-35454-32211' },
		{ voter_id: 'test-7', voter_secret: 'test-35454-32211' }
	]
};

export default () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ voterData, setVoterData ] = useState({});

	const createElection = async (data) => {
		setIsLoading(true);
		const res = await fetch('/api/create', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(data)
		});
		const voterData = await res.json();
		setIsLoading(false);
		setVoterData(voterData);
	};

	return (
		<Layout>
			{isLoading ? (
				<Spinner />
			) : voterData.success ? (
				<ElectionCreated voterData={voterData} />
			) : (
				<CreateElection createElection={createElection} />
			)}
		</Layout>
	);
};
