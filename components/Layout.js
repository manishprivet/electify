import Link from 'next/link';

export default ({ children }) => {
	return (
		<div className='top-container'>
			<nav>
				<ul>
					<li>
						<Link href='/'>
							<a>HOME</a>
						</Link>
					</li>
					<li>
						<Link href='/create'>
							<a>CREATE</a>
						</Link>
					</li>
					<li>
						<Link href='/results'>
							<a>RESULTS</a>
						</Link>
					</li>
					<li>
						<Link href='/aboutme'>
							<a>ABOUT ME</a>
						</Link>
					</li>
				</ul>
			</nav>
			{children}
			<footer>
				<a href='https://manishprivet.github.io' target='_blank' rel='noopener noreferrer'>
					Made By <img src='/vercel.svg' alt='Vercel Logo' className='logo' />
				</a>
			</footer>
			<style jsx>{`
				.top-container {
					position: relative;
					min-height: 100vh;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				nav {
					position: fixed;
					width: 100%;
					height: 60px;
					z-index: 1200;
					top: 0;
					background: var(--button-color);
					display: flex;
					justify-content: flex-end;
				}

				nav ul {
					list-style: none;
					margin-right: 15px;
				}

				nav ul a {
					transition: all 0.2s ease-in;
				}

				nav ul a:hover {
					filter: contrast(50%);
				}

				nav ul li {
					display: inline-block;
					margin: 0 15px;
					font-size: 1.3em;
					letter-spacing: 3px;
					color: var(--text-color);
				}

				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid var(--highlight-color);
					display: flex;
					justify-content: center;
					align-items: center;
					color: var(--text-color);
				}

				footer img {
					margin-left: 0.5rem;
				}

				footer a {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				a {
					color: inherit;
					text-decoration: none;
				}
				.logo {
					height: 1em;
					filter: var(--invert-value);
				}
			`}</style>
		</div>
	);
};
