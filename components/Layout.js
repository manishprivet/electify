import Link from 'next/link';
import { useRef } from 'react';

export default ({ children }) => {
	const navList = useRef();

	const toggleDarkMode = () => {
		const style = document.body.style;
		let lightMode = document.body.style.getPropertyValue('--background-color');
		if (!lightMode) lightMode = true;
		else lightMode = lightMode === '#16161a';
		style.setProperty('--background-color', lightMode ? '#fffffe' : '#16161a');
		style.setProperty('--text-color', lightMode ? '#16161a' : '#fffffe');
		style.setProperty('--invert-value', `invert(${lightMode ? 100 : 0}%)`);
	};

	const openNav = () => {
		navList.current.classList.add('nav-show');
	};

	const closeNav = () => {
		navList.current.classList.remove('nav-show');
	};

	return (
		<div className='top-container c-flex'>
			<nav>
				<div className='electify-logo c-flex'>
					<img src='/electify-logo.png' alt='logo' />
					<span>Electify</span>
				</div>
				<div onClick={openNav} className='hamburger c-flex'>
					<img src='/menu.svg' alt='menu' />
				</div>
				<ul ref={navList} className='c-flex'>
					<li onClick={closeNav} className='back-button'>
						<img src='/back.png' alt='menu' />
					</li>
					<li onClick={closeNav}>
						<Link href='/'>
							<a>HOME</a>
						</Link>
					</li>
					<li onClick={closeNav}>
						<Link href='/create'>
							<a>CREATE</a>
						</Link>
					</li>
					<li onClick={closeNav}>
						<Link href='/vote'>
							<a>VOTE</a>
						</Link>
					</li>
					<li onClick={closeNav}>
						<Link href='/results'>
							<a>RESULTS</a>
						</Link>
					</li>
					<li className='dark-mode'>
						<img onClick={toggleDarkMode} src='/daynight.png' alt='Toggle Dark Mode' />
					</li>
				</ul>
			</nav>
			{children}
			<footer className='c-flex'>
				<a className='c-flex' href='https://manishprivet.github.io' target='_blank' rel='noopener noreferrer'>
					Made By <img src='/me.png' alt='Me' className='logo' />
				</a>
				<a href='/PrivacyPolicyElectify.pdf' target='_blank'>
					Privacy Policy
				</a>
			</footer>
			<style jsx global>{``}</style>
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

				.hamburger {
					display: none;
					height: 100%;
				}

				.hamburger img {
					height: 40px;
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

				nav ul li.back-button {
					display: none;
				}

				nav ul li {
					display: inline-block;
					margin: 0 15px;
					font-size: 1.3em;
					letter-spacing: 3px;
					color: #16161a;
				}

				nav ul .dark-mode {
					width: 30px;
					cursor: pointer;
					filter: invert(100%);
				}

				nav ul .dark-mode img {
					width: inherit;
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
					color: var(--text-color);
				}

				footer a:last-child {
					font-size: 1em;
					color: var(--highlight-color);
					margin-left: 20px;
				}

				a {
					color: inherit;
					text-decoration: none;
				}

				.logo {
					height: 2em;
					border-radius: 50%;
				}
				nav ul.nav-show {
					right: 0;
				}

				nav ul.nav-show li {
					transform: translateX(0);
				}

				@media only screen and (max-width: 800px) {
					.electify-logo img {
						height: 55%;
					}

					.hamburger {
						display: flex;
						margin-right: 20px;
					}

					nav ul li.back-button {
						display: block;
					}

					nav ul li.back-button img {
						height: 2em;
						width: 2em;
						filter: var(--invert-value);
					}

					nav ul .dark-mode {
						filter: var(--invert-value);
						position: relative;
						/* left: -10px; */
						width: 45px;
					}

					nav ul {
						height: 100%;
						width: 100%;
						top: 0;
						right: -130%;
						z-index: 1800;
						position: fixed;
						flex-flow: column nowrap;
						background: var(--background-color);
						margin: 0;
						transition: 0.5s ease-out;
					}

					nav ul li {
						color: #fff;
						margin: 30px 0 0 0;
						transform: translateX(200%);
						transition: 0.8s ease-out;
						transform-origin: 0 0;
					}

					.nav-show li a {
						color: var(--text-color);
					}
				}
			`}</style>
		</div>
	);
};
