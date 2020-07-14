import Link from 'next/link';
import { useState, useEffect } from 'react';

export default ({ children }) => {
	const toggleDarkMode = () => {
		const style = document.body.style;
		let lightMode = document.body.style.getPropertyValue('--background-color');
		if (!lightMode) lightMode = true;
		else lightMode = lightMode === '#16161a';
		style.setProperty('--background-color', lightMode ? '#fffffe' : '#16161a');
		style.setProperty('--text-color', lightMode ? '#16161a' : '#fffffe');
	};

	return (
		<div className='top-container c-flex'>
			<nav>
				<div className='electify-logo c-flex'>
					<img src='/electify-logo.png' alt='logo' />
					<span>Electify</span>
				</div>

				<ul className='c-flex'>
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
						<Link href='/vote'>
							<a>VOTE</a>
						</Link>
					</li>
					<li>
						<Link href='/results'>
							<a>RESULTS</a>
						</Link>
					</li>
					<li>
						<img onClick={toggleDarkMode} src='/daynight.png' alt='Toggle Dark Mode' />
					</li>
				</ul>
			</nav>
			{children}
			<footer className='c-flex'>
				<a className='c-flex' href='https://manishprivet.github.io' target='_blank' rel='noopener noreferrer'>
					Made By <img src='/me.png' alt='Me' className='logo' />
				</a>
			</footer>
			<style jsx>{`
				.top-container {
					position: relative;
					min-height: 100vh;
					flex-direction: column;
				}

				.electify-logo {
					height: 100%;
					justify-self: start;
					margin-right: auto;
					margin-left: 25px;
				}

				.electify-logo img {
					height: 65%;
					object-fit: cover;
				}

				.electify-logo span {
					font-family: monospace;
					font-size: 2em;
					margin-left: 15px;
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
					color: var(--text-color);
				}

				footer img {
					margin-left: 0.5rem;
				}

				footer a {
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
