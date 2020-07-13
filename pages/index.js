import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Electify</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<h1 className='title'>
					Welcome to <a href='https://electify.manish.codes'>Electify!</a>
				</h1>

				<div className='grid'>
					<Link href='/create'>
						<a className='card'>
							<h3>Create Election</h3>
							<p>Create an anonymous election</p>
						</a>
					</Link>
					<Link href='/results'>
						<a className='card'>
							<h3>View Election Results</h3>
							<p>View Results of existing election</p>
						</a>
					</Link>
					<Link href='/vote'>
						<a className='card'>
							<h3>Vote for an Election</h3>
							<p>Keep your Election ID, Voter ID and Voter Secret ready</p>
						</a>
					</Link>
				</div>
			</main>

			<style jsx>{`
				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: var(--text-color);
				}

				.title a {
					color: var(--button-color);
					text-decoration: none;
				}

				.title a:hover,
				.title a:focus,
				.title a:active {
					text-decoration: underline;
				}

				.title {
					margin: 0;
					line-height: 1.15;
					font-size: 4rem;
				}

				.title,
				.description {
					text-align: center;
				}

				.description {
					line-height: 1.5;
					font-size: 1.5rem;
				}

				code {
					background: var(--background-color);
					border-radius: 5px;
					padding: 0.75rem;
					font-size: 1.1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
						Bitstream Vera Sans Mono, Courier New, monospace;
				}

				.grid {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;

					max-width: 800px;
					margin-top: 3rem;
				}

				.card {
					margin: 1rem;
					flex-basis: 45%;
					padding: 1.5rem;
					text-align: left;
					color: inherit;
					text-decoration: none;
					border: 1px solid var(--highlight-color);
					border-radius: 10px;
					transition: color 0.15s ease, border-color 0.15s ease;
					width: 180px;
					height: 100px;
				}

				.card:hover,
				.card:focus,
				.card:active {
					color: var(--button-color);
					border-color: var(--button-color);
				}

				.card h3 {
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
				}

				.card p {
					margin: 0;
					font-size: 1.25rem;
					line-height: 1.5;
				}

				@media (max-width: 600px) {
					.grid {
						width: 100%;
						flex-direction: column;
					}
				}
			`}</style>
		</Layout>
	);
}
