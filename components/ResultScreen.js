import Countdown from './Countdown';
import { useRouter } from 'next/router';
import ProgressBar from './ProgressBar';

export default ({ data }) => {
	const router = useRouter();
	const getWinners = (candidates) => {
		const maximumVotes = Math.max.apply(
			Math,
			candidates.map(function(o) {
				return o.votes;
			})
		);
		return candidates.filter((candidate) => candidate.votes === maximumVotes);
	};

	const winners = getWinners(data.candidates);

	return (
		<div className='container'>
			<h1>
				Results for Election<br />
				<span style={{ color: 'var(--button-color)' }}>{data.display_name}</span>
			</h1>
			{data.candidates.map((candidate, index) => (
				<div key={candidate.name + index} className='candidate c-flex'>
					<div className='candidate-label'>
						<p>{candidate.name}</p>
						<p>
							{candidate.votes} Vote{candidate.votes === 1 ? '' : 's'} out of {data.total_votes}
						</p>
					</div>
					<ProgressBar total={data.total_votes} progress={candidate.votes} />
				</div>
			))}
			{data.voters_remaining ? data.auth_type === 'gsuite' ? (
				<h2 style={{ textAlign: 'center' }}>
					<span style={{ color: 'var(--button-color)' }}>{data.total_votes}</span> people of your domain have{' '}
					voted till now and<br />
					{winners.length > 1 ? (
						<span>
							{winners.map((winner, i) => (
								<span key={i} style={{ color: 'var(--button-color)', fontSize: '1.2em' }}>
									{winner.name}
									<span style={{ color: 'var(--text-color)', fontSize: '1em' }}>
										{i === winners.length - 2 ? ' and ' : i === winners.length - 1 ? '' : ', '}
									</span>
								</span>
							))}
							<br />
							are{' '}
						</span>
					) : (
						<span>
							<span style={{ color: 'var(--button-color)', fontSize: '1.2em' }}>{winners[0].name}</span>
							<br />is{' '}
						</span>
					)}
					currently in lead
				</h2>
			) : (
				<h2>
					<span style={{ color: 'var(--button-color' }}>{data.voters_remaining}</span> out of{' '}
					<span style={{ color: 'var(--button-color' }}>{data.voters_remaining + data.total_votes}</span>{' '}
					voters are yet to vote
				</h2>
			) : winners.length > 1 ? (
				<h2 style={{ textAlign: 'center', marginTop: '40px' }}>
					Election ended and there is a tie between<br />
					{winners.map((winner, i) => (
						<span key={i} style={{ color: 'var(--button-color', fontSize: '1.2em' }}>
							{winner.name}
							<span style={{ color: 'var(--text-color', fontSize: '1em' }}>
								{i === winners.length - 2 ? ' and ' : i === winners.length - 1 ? '' : ', '}
							</span>
						</span>
					))}
				</h2>
			) : (
				<h2 style={{ textAlign: 'center', marginTop: '40px' }}>
					Election ended and the winner is<br />
					<span style={{ color: 'var(--button-color', fontSize: '1.2em' }}>{winners[0].name}</span>
				</h2>
			)}
			<h2 style={{ textAlign: 'center' }}>
				This Election will expire in: <br />
				<Countdown
					style={{ color: 'red', fontFamily: 'monospace', fontSize: '1.2em' }}
					epoch={data.expiration_time}
				/>
			</h2>
			<button onClick={() => router.push('/')}>Go to Home</button>
			<style jsx>{`
				.candidate {
					width: 100%;
					flex-flow: column nowrap;
				}

				.candidate .candidate-label {
					width: 80%;
					display: flex;
					justify-content: start;
				}

				.candidate .candidate-label p {
					font-size: 1.2em;
				}

				.candidate .candidate-label p:last-child {
					justify-self: end;
					margin-left: auto;
					color: var(--highlight-color);
				}
			`}</style>
		</div>
	);
};
