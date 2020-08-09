import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import Layout from '../../components/Layout';
import { data as dataInterface, voteInterface } from '../../interfaces/data';

const VotingScreen = dynamic(() => import('../../components/VotingScreen'), {
  loading: () => <Spinner />,
});

const Vote: React.FC<unknown> = () => {
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<dataInterface>();
  const [successful, setSuccessful] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      fetch(`/api/vote/${id}`)
        .then((res) => res.json())
        .then((electionData) => {
          setData(electionData);
          setIsLoading(false);
        });
    }
  }, [id]);

  const vote = async ({ voterId, voterSecret, cIndex, tokenId, authType }: voteInterface) => {
    if (
      cIndex < 0 ||
      !authType ||
      (authType === 'secret' && !voterId && !voterSecret) ||
      (authType === 'google' && !tokenId)
    )
      return setErrors('All values are required');
    setIsLoading(true);
    const voterData = {
      election_id: id,
      voter_id: voterId,
      voter_secret: voterSecret,
      c_index: cIndex,
      auth_type: authType,
      token_id: tokenId,
    };
    const res = await fetch('/api/vote', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(voterData),
    });
    const result = await res.json();
    if (result.success) setSuccessful(true);
    else setErrors(result.error);
    return setIsLoading(false);
  };

  return (
    <Layout>
      {!isLoading ? (
        successful ? (
          <div className="container">
            <h1>Vote Passed</h1>
            <button type="button" onClick={() => router.push('/results/[id]', `/results/${id}`)}>
              See Results
            </button>
          </div>
        ) : data.success ? (
          <VotingScreen data={data} vote={vote} errors={errors} setErrors={setErrors} />
        ) : (
          <div className="container">
            <h1>Given Election ID is invalid</h1>
            <button type="button" onClick={() => router.push('/vote')}>
              Go Back
            </button>
          </div>
        )
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

Vote.displayName = 'VotingScreen';
export default Vote;
