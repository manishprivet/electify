import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Spinner from '../../components/Spinner';
import Layout from '../../components/Layout';
const ResultScreen = dynamic(() => import('../../components/ResultScreen'), {
	loading: () => <Spinner />
});

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
			) : data.success ? (
				<ResultScreen data={data} />
			) : (
				<div className='container'>
					<h1>Given Election ID is invalid</h1>
					<button onClick={() => router.push('/results')}>Go Back</button>
				</div>
			)}
		</Layout>
	);
};
