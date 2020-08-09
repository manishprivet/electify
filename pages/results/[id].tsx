import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Spinner from '../../components/Spinner';
import Layout from '../../components/Layout';
import { data as dataInterface } from '../../interfaces/data';

const ResultScreen = dynamic(() => import('../../components/ResultScreen'), {
  loading: () => <Spinner />,
});

const App: React.FC<unknown> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<dataInterface>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      fetch(`/api/vote/${id}`)
        .then((res) => res.json())
        .then((newData) => {
          setData(newData);
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <Layout>
      {isLoading ? (
        <Spinner />
      ) : data.success ? (
        <ResultScreen data={data} />
      ) : (
        <div className="container">
          <h1>Given Election ID is invalid</h1>
          <button type="button" onClick={() => router.push('/results')}>
            Go Back
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
