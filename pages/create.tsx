import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Head from 'next/head';
import { data as dataInterface } from '../interfaces/data';

const ElectionCreated = dynamic(() => import('../components/ElectionCreated'), {
  loading: () => <Spinner />,
});
const CreateElection = dynamic(() => import('../components/CreateElection'), {
  loading: () => <Spinner />,
});

const App: React.FC<unknown> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [voterData, setVoterData] = useState<dataInterface>({ success: false });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const createElection = async (data: dataInterface) => {
    setIsLoading(true);
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newVoterData = (await res.json()) as dataInterface;
    setIsLoading(false);
    setVoterData(newVoterData);
    return null;
  };

  return (
    <Layout>
      <Head><title>Create Election | Electify</title></Head>
      {isLoading ? (
        <Spinner />
      ) : voterData.success ? (
        <ElectionCreated voterData={voterData} />
      ) : (
        <CreateElection createElection={createElection} />
      )}
    </Layout>
  );
};

export default App;
