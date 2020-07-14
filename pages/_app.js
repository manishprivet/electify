function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Component {...pageProps} />
			<style jsx global>{`
				body {
					--button-color: #00d1c7;
					--text-color: #fffffe;
					--background-color: #16161a;
					--highlight-color: #777;
					--invert-value: invert(0%);
					transition: all 0.3s ease-out;
				}

				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
						Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
					background: var(--background-color);
				}

				.c-flex {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.container {
					position: relative;
					min-height: calc(100vh - 201px);
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
					text-align: center;
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
					padding-left: 20px;
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

				.error {
					color: red;
					font-size: 1.3em;
					align-self: start;
					margin-right: auto;
					margin-left: 30px;
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

				table {
					background-color: #d3d3d34a;
					padding: 10px;
					border-radius: 20px;
					margin: 15px 0;
				}

				th,
				td {
					padding: 7px 15px 10px 15px;
					text-align: center;
					font-size: 1.2em;
				}

				td:first-child {
					border-right: 1px solid white;
				}
			`}</style>
		</div>
	);
}

export default MyApp;
