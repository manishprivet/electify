import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default () => {
	const [ electionId, setElectionId ] = useState('');
	const [ errors, setErrors ] = useState('');
	const router = useRouter();

	function redirect() {
		if (!electionId) return setErrors('Enter an Election ID');
		router.push('/results/[id]', `/results/${electionId}`);
	}

	return (
		<Layout>
			<div className='container'>
				<h1>Get Voting Results</h1>
				<label htmlFor='election-id'>Election ID</label>
				<input
					onKeyPress={(e) => (e.charCode === 13 ? null : null)}
					onChange={(e) => setElectionId(e.target.value)}
					type='text'
					id='election-id'
					placeholder='The unique Election ID'
				/>
				<span />
				{errors ? <p className='error'>{errors}</p> : null}
				<button onClick={redirect}>SEE RESULTS</button>
			</div>
		</Layout>
	);
};
