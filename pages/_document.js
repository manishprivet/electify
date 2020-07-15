import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang='en'>
				<Head>
					<link rel='apple-touch-icon' sizes='57x57' href='/icons/apple-icon-57x57.png' />
					<link rel='apple-touch-icon' sizes='60x60' href='/icons/apple-icon-60x60.png' />
					<link rel='apple-touch-icon' sizes='72x72' href='/icons/apple-icon-72x72.png' />
					<link rel='apple-touch-icon' sizes='76x76' href='/icons/apple-icon-76x76.png' />
					<link rel='apple-touch-icon' sizes='114x114' href='/icons/apple-icon-114x114.png' />
					<link rel='apple-touch-icon' sizes='120x120' href='/icons/apple-icon-120x120.png' />
					<link rel='apple-touch-icon' sizes='144x144' href='/icons/apple-icon-144x144.png' />
					<link rel='apple-touch-icon' sizes='152x152' href='/icons/apple-icon-152x152.png' />
					<link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-icon-180x180.png' />
					<link rel='icon' type='image/png' sizes='192x192' href='/icons/android-icon-192x192.png' />
					<link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='96x96' href='/icons/favicon-96x96.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
					<meta name='msapplication-TileColor' content='#ffffff' />
					<meta name='msapplication-TileImage' content='/icons/ms-icon-144x144.png' />
					<meta name='theme-color' content='#00d1c7' />
					<meta property='og:title' content='Electify' />
					<meta
						property='og:description'
						content='Create Private and Anonymous Elections Instantly and Unlimited. No need to Sign UP'
					/>
					<meta property='og:image' content='/electify-banner.png' />
					<meta property='og:image:height' content='1200' />
					<meta property='og:image:width' content='630' />
					<meta property='og:url' content='https://electify.manish.codes/' />
					<meta name='twitter:card' content='summary_large_image' />
					<meta name='twitter:creator' content='@manishprivet' />
					<meta property='og:site_name' content='Electify' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
