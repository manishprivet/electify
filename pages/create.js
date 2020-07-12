import { useState } from 'react';
import Layout from '../components/Layout';

export default () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ electionName, setElectionName ] = useState('');
	const [ electionId, setElectionId ] = useState('');
	const [ noOfVoters, setNoOfVoters ] = useState('');

	return (
		<Layout>
			<main className='container'>
				<h1>Create an Election</h1>
				<label htmlFor='election-name'>Election Name</label>
				<input
					onChange={(e) => setElectionName(e.target.value)}
					type='text'
					id='election-name'
					placeholder='A proper name for your Election'
				/>
				<label htmlFor='election-id'>Election Name</label>
				<input
					onChange={(e) => setElectionId(e.target.value)}
					type='text'
					id='election-id'
					placeholder='Give your election an unique id'
				/>
				<label htmlFor='no-of-voters'>Election Name</label>
				<input
					onChange={(e) => setNoOfVoters(e.target.value)}
					type='text'
					id='no-of-voters'
					placeholder={`Number of Voters that'll be participating`}
				/>
				<button>Create</button>
				<style jsx>{`
					.container {
						height: 100%;
						width: 40%;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-flow: column nowrap;
						margin: auto;
						color: var(--text-color);
					}

					.container h1 {
						font-size: 3em;
						margin-bottom: 50px;
					}

					.container label {
						font-size: 1.4em;
						align-self: start;
						margin-right: auto;
						margin-left: 10px;
					}

					.container input {
						background: var(--background-color);
						color: var(--text-color);
						width: 100%;
						border: none;
						border-bottom: 2px solid var(--text-color);
						font-size: 1.3em;
						padding: 10px;
						outline: none;
						margin: 10px 0;
						transition: all 0.2s ease-in;
					}

					.container input:focus {
						border-bottom: 2px solid var(--button-color);
					}

					.container button {
						outline: none;
						background: none;
						border: 2px solid var(--button-color);
						border-radius: 40px;
						color: var(--button-color);
						padding: 15px 45px;
						font-size: 1.3em;
						margin-top: 30px;
						box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0);
						transition: all 0.2s ease-in;
					}

					.container button:hover {
						cursor: pointer;
						color: var(--background-color);
						background: var(--button-color);
						box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.4);
					}
				`}</style>
			</main>
		</Layout>
	);
};
