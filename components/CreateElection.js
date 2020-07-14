import { useState, useRef } from 'react';
import RadioButton from './RadioButton';

const pattern = /^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/g;

export default ({ createElection }) => {
	const [ electionName, setElectionName ] = useState('');
	const [ electionId, setElectionId ] = useState('');
	const [ noOfVoters, setNoOfVoters ] = useState('');
	const [ candidates, setCandidates ] = useState([]);
	const [ newCandidate, setNewCandidate ] = useState('');
	const [ errors, setErrors ] = useState('');
	const [ authType, setAuthType ] = useState(-1);
	const [ emails, setEmails ] = useState('');
	const newCandidateBox = useRef();
	const emailBox = useRef();
	const noOfVotersBox = useRef();

	const setAuthenticationType = (i) => {
		if (i == 0) {
			noOfVotersBox.current.classList.remove('active');
			emailBox.current.classList.add('active');
		} else {
			emailBox.current.classList.remove('active');
			noOfVotersBox.current.classList.add('active');
		}
		setAuthType(i);
	};

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
		if (
			!electionName ||
			!electionId ||
			authType < 0 ||
			(authType == 1 && !noOfVoters) ||
			(authType == 0 && !emails) ||
			!candidates.length
		)
			return setErrors('All values are required.');
		if (!pattern.test(electionId))
			return setErrors(`Election id only contain characters between 0-9, a-z, A-Z and hyphen(-)`);
		if (noOfVoters > 10000) return setErrors(`Number of voters can't be more than`);
		const c = [ ...candidates ];
		c.forEach((candidate, index) => (candidate.name === '' ? c.splice(index, 1) : null));
		const data = {
			display_name: electionName,
			election_name: electionId.toLowerCase(),
			no_of_voters: noOfVoters,
			candidates: c,
			auth_type: authType == 0 ? 'google' : 'secret',
			emails: emails
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
			<label htmlFor='auth-type'>Select Auth Type</label>
			<RadioButton
				array={[ 'Google Email', 'Voter ID and Secret' ]}
				setIndex={setAuthenticationType}
				id='auth-type'
			/>
			<div ref={emailBox} className='emails c-flex'>
				<label htmlFor='emails'>Enter emails seperated by commas</label>
				<p>We'll ask voters to verify their email by google.</p>
				<textarea onChange={(e) => setEmails(e.target.value)} />
			</div>
			<div ref={noOfVotersBox} className='voters'>
				<label htmlFor='no-of-voters'>Number of Voters</label>
				<input
					onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
					onChange={(e) => setNoOfVoters(e.target.value)}
					type='text'
					id='no-of-voters'
					placeholder={`Number of Voters that'll be participating`}
				/>
				<span />
			</div>

			{errors ? <p className='error'>{errors}</p> : null}
			<button onClick={createElectionData}>Create</button>
			<style jsx>{`
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

				.emails {
					width: 100%;
					flex-flow: column nowrap;
					height: 0;
					transform-origin: 0 0;
					transform: scale(1, 0);
					transition: all 0.3s ease-out;
				}

				.voters {
					width: 100%;
					height: 0;
					transform-origin: 0 0;
					transform: scale(1, 0);
					transition: all 0.3s ease-out;
					margin-top: 20px;
				}

				.emails.active {
					height: 313px;
					transform: scale(1, 1);
				}

				.voters.active {
					height: auto;
					transform: scale(1, 1);
				}

				.emails p {
					color: var(--highlight-color);
					font-size: 1.2em;
					justify-self: start;
					margin-right: auto;
					margin-left: 10px;
				}

				.emails textarea {
					width: 96%;
					height: 150px;
					resize: vertical;
					margin: 10px 0;
					background: var(--background-color);
					outline: none;
					border: 2px solid var(--highlight-color);
					color: var(--text-color);
					caret-color: var(--text-color);
					border-radius: 20px;
					padding: 15px 10px;
					font-size: 1.3em;
				}
			`}</style>
		</main>
	);
};
