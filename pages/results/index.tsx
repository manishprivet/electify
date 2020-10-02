import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Head from "next/head";

const App: React.FC<unknown> = () => {
  const [electionId, setElectionId] = useState<string>();
  const [errors, setErrors] = useState<string>();
  const router = useRouter();

  function redirect() {
    if (!electionId) return setErrors('Enter an Election ID');
    return router.push('/results/[id]', `/results/${electionId}`);
  }

  return (
    <Layout>
       <Head><title>Election Results | Electify</title></Head>
      <div className="container">
        <h1>Get Voting Results</h1>
        <label htmlFor="election-id">Election ID</label>
        <input
          onKeyPress={(e) => (e.charCode === 13 ? null : null)}
          onChange={(e) => setElectionId(e.target.value)}
          type="text"
          id="election-id"
          placeholder="The unique Election ID"
        />
        <span />
        {errors ? <p className="error">{errors}</p> : null}
        <button type="button" onClick={redirect}>
          SEE RESULTS
        </button>
      </div>
    </Layout>
  );
};

export default App;
