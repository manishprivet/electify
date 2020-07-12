function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Component {...pageProps} />
			<style jsx global>{`
				:root {
					--button-color: #0070f3;
					--text-color: #fffffe;
					--background-color: #16161a;
					--highlight-color: #eaeaea;
					--invert-value: invert(100%);
				}

				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
						Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
					background: var(--background-color);
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
}

export default MyApp;
