import { useState, useRef } from 'react';

const pattern = /^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/g;

export default ({ createElection }) => {
	const [ electionName, setElectionName ] = useState('');
	const [ electionId, setElectionId ] = useState('');
	const [ noOfVoters, setNoOfVoters ] = useState('');
	const [ candidates, setCandidates ] = useState([]);
	const [ newCandidate, setNewCandidate ] = useState('');
	const [ errors, setErrors ] = useState('');
	const newCandidateBox = useRef();

	const removeCandidate = (index) => {
		setCandidates((c) => {
			const c_new = [ ...c ];
			c_new.splice(index, 1);
			return c_new;
		});
	};

	const addCandidate = async () => {
		await setCandidates((c) => {
			const c_new = [ ...c ];
			c_new.push({ name: newCandidate });
			return c_new;
		});
		await setNewCandidate('');
		newCandidateBox.current.focus();
	};

	const changePreviousCandidate = (i, v) => {
		setCandidates((c) => {
			const c_new = [ ...c ];
			c_new[i].name = v;
			return c_new;
		});
	};

	const createElectionData = () => {
		if (!electionName || !electionId || !noOfVoters || !candidates.length)
			return setErrors('All values are required.');
		if (!pattern.test(electionId))
			return setErrors(`Election id only contain characters between 0-9, a-z, A-Z and hyphen(-)`);
		const c = [ ...candidates ];
		c.forEach((candidate, index) => (candidate.name === '' ? c.splice(index, 1) : null));
		const data = {
			display_name: electionName,
			election_name: electionId.toLowerCase(),
			no_of_voters: noOfVoters,
			candidates: c
		};
		createElection(data);
	};

	return (
		<main className='container'>
			<h1>Create an Election</h1>
			<label htmlFor='election-name'>Election Name</label>
			<input
				onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
				onChange={(e) => setElectionName(e.target.value)}
				type='text'
				id='election-name'
				placeholder='A proper name for your Election'
			/>
			<span />
			<label htmlFor='election-id'>Election ID</label>
			<input
				onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
				onChange={(e) => setElectionId(e.target.value)}
				type='text'
				id='election-id'
				placeholder='Give your election an unique id'
			/>
			<span />
			<label htmlFor='no-of-voters'>Number of Voters</label>
			<input
				onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
				onChange={(e) => setNoOfVoters(e.target.value)}
				type='text'
				id='no-of-voters'
				placeholder={`Number of Voters that'll be participating`}
			/>
			<span />
			<div className='candidates'>
				<h2>Choose Candidates</h2>
				{candidates.map((candidate, index) => (
					<div key={`candidate-${index}`} className='candidate'>
						<input
							onKeyPress={(e) => (e.charCode === 13 ? newCandidateBox.current.focus() : null)}
							value={candidate.name}
							onChange={(e) => changePreviousCandidate(index, e.target.value)}
							type='text'
						/>
						<button
							aria-label='remove candidate'
							onClick={() => removeCandidate(index)}
							className='remove-candidate'
						>
							<div className='plus remove' />
						</button>
					</div>
				))}
				<div className='candidate new-candidate'>
					<input
						id='new-candidate'
						ref={newCandidateBox}
						onKeyPress={(e) => (e.charCode === 13 ? addCandidate() : null)}
						value={newCandidate}
						onChange={(e) => setNewCandidate(e.target.value)}
						type='text'
					/>
					<button
						disabled={newCandidate === ''}
						className='add-candidate'
						onClick={addCandidate}
						aria-label='Add Candidate'
					>
						<div className='plus' />
					</button>
				</div>
			</div>
			{errors ? <p className='error'>{errors}</p> : null}
			<button onClick={createElectionData}>Create</button>
			<style jsx>{`
				.container {
					position: relative;
					height: auto;
					width: 40%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-flow: column nowrap;
					margin: auto;
					color: var(--text-color);
					margin-top: 60px;
					margin-bottom: 40px;
					overflow-x: hidden;
					overflow-y: visible;
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
					margin-top: 15px;
				}

				.container input {
					position: relative;
					z-index: 5;
					background: var(--background-color);
					color: var(--text-color);
					width: 100%;
					border: none;
					border-bottom: 2px solid var(--text-color);
					font-size: 1.3em;
					padding: 10px;
					outline: none;
					margin: 10px 0;
					caret-color: var(--text-color);
				}

				.container input:focus + span {
					width: 100%;
					transition: 0.2s ease-in-out;
				}

				.container input + span {
					content: "";
					position: relative;
					width: 0%;
					height: 0;
					border-bottom: 3px solid var(--button-color);
					z-index: 15;
					transform: translateY(-13px);
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

				.candidates {
					position: relative;
					height: auto;
					width: 100%;
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
				}
				.candidates h2 {
					font-size: 2em;
					margin: 20px 0;
				}
				.candidates input {
					width: 75%;
					border: 1px solid var(--text-color);
				}
				.candidates .candidate {
					width: 100%;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-around;
				}

				.candidates .candidate button {
					margin: 0 15px;
					border: none;
					background: none;
					padding: 0;
				}

				.error {
					color: red;
					font-size: 1.3em;
					align-self: start;
					margin-right: auto;
					margin-left: 30px;
				}

				.plus {
					display: inline-block;
					width: 50px;
					height: 50px;
					border: none;

					background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), var(--button-color);
					background-position: center;
					background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
					background-repeat: no-repeat;
					border-radius: 50%;
				}

				.plus.remove {
					transform: rotate(45deg);
				}

				@media only screen and (max-width: 1200px) {
					.container {
						width: 70%;
					}
				}

				@media only screen and (max-width: 600px) {
					.container {
						width: 90%;
					}
					.container h1 {
						font-size: 2em;
						margin-bottom: 30px;
					}
					.container input {
						font-size: 1.2em;
					}
				}
			`}</style>
		</main>
	);
};
