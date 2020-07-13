import Link from 'next/link';

export default ({ children }) => {
	const toggleDarkMode = () => {
		const style = document.body.style;
		style.setProperty('--background-color', '#fffffe');
		style.setProperty('--text-color', '#16161a');
	};

	return (
		<div className='top-container'>
			<nav>
				<img className='electify-logo' src='/electify-logo.png' alt='logo' />
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
					<li>
						<img onClick={toggleDarkMode} src='/daynight.png' alt='Toggle Dark Mode' />
					</li>
				</ul>
			</nav>
			{children}
			<footer>
				<a href='https://manishprivet.github.io' target='_blank' rel='noopener noreferrer'>
					Made By <img src='/me.png' alt='Me' className='logo' />
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

				.electify-logo {
					height: 65%;
					object-fit: cover;
					justify-self: start;
					margin-right: auto;
					margin-left: 25px;
				}

				nav {
					position: fixed;
					width: 100%;
					height: 60px;
					z-index: 1200;
					top: 0;
					background: white;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					box-shadow: 0 1px 20px 3px rgba(0, 0, 0, 0.3);
				}

				nav ul {
					list-style: none;
					margin-right: 15px;
					display: flex;
					align-items: center;
				}

				nav ul a {
					transition: all 0.2s ease-in;
				}

				nav ul a:hover {
					filter: contrast(150%);
				}

				nav ul li {
					display: inline-block;
					margin: 0 15px;
					font-size: 1.3em;
					letter-spacing: 3px;
					color: #16161a;
				}

				nav ul li img {
					width: 30px;
					cursor: pointer;
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
					font-size: 1.5em;
				}

				a {
					color: inherit;
					text-decoration: none;
				}
				.logo {
					height: 2em;
					border-radius: 50%;
				}
			`}</style>
		</div>
	);
};
