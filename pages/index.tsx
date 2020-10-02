/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home: React.FC<unknown> = () => {
  return (
    <Layout>
      <Head>
        <title>Electify</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/android-icon-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#16161a" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#00d1c7" />
        <meta property="og:title" content="Electify" />
        <meta
            property="og:description"
            content="Create Private and Anonymous Elections Instantly and Unlimited. No need to Sign UP"
        />
        <meta property="og:image" content="/electify-banner.png" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:width" content="630" />
        <meta property="og:url" content="https://electify.manish.codes/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@manishprivet" />
        <meta property="og:site_name" content="Electify" />
      </Head>

      <main>
        <img src="/electify-logo.png" alt="logo" />
        <h1 className="title">
          Welcome to <a href="https://electify.manish.codes">Electify!</a>
        </h1>

        <div className="grid">
          <Link href="/create">
            <a className="card">
              <h3>Create Election</h3>
              <p>Create an anonymous election</p>
            </a>
          </Link>
          <Link href="/vote">
            <a className="card">
              <h3>Vote for an Election</h3>
              <p>Keep your Election ID, Voter ID and Voter Secret ready</p>
            </a>
          </Link>
          <Link href="/results">
            <a className="card">
              <h3>View Election Results</h3>
              <p>View Results of existing election</p>
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
          margin-top: 80px;
        }

        main img {
          width: 30%;
        }

        .title a {
          color: var(--button-color);
          text-decoration: none;
          font-family: monospace;
          font-size: 1.2em;
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
          margin-top: 20px;
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
          .title {
            font-size: 3em;
            margin: 20px 40px;
          }

          .grid {
            width: 100%;
            flex-direction: column;
          }

          .card {
            width: 65%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
