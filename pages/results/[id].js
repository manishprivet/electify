import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import Layout from '../../components/Layout';
import Countdown from '../../components/Countdown';

export default () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ data, setData ] = useState({});
	const router = useRouter();
	const { id } = router.query;

	useEffect(
		() => {
			setIsLoading(true);
			if (id) {
				fetch(`/api/vote/${id}`).then((res) => res.json()).then((data) => {
					setData(data);
					setIsLoading(false);
				});
			}
		},
		[ id ]
	);

	return (
		<Layout>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='container'>
					<h1>
						Results for Election <span style={{ color: 'var(--button-color)' }}>{data.display_name}</span>
					</h1>
					<table>
						<tbody>
							<tr>
								<th>Candidate Name</th>
								<th>Number of Votes</th>
							</tr>
							{data.candidates.map((candidate, index) => (
								<tr key={candidate.name + index}>
									<td>{candidate.name}</td>
									<td>{candidate.votes}</td>
								</tr>
							))}
						</tbody>
					</table>
					<h2 style={{ textAlign: 'center' }}>
						This will expire in: <br />
						<Countdown
							style={{ color: 'red', fontFamily: 'monospace', fontSize: '1.2em' }}
							epoch={data.expiration_time}
						/>
					</h2>
					<button onClick={() => router.push('/')}>Go to Home</button>
				</div>
			)}
		</Layout>
	);
};
