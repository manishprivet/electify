import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import dynamic from "next/dynamic";
import { data as dataInterface } from "../interfaces/data";
const ElectionCreated = dynamic(() => import("../components/ElectionCreated"), {
  loading: () => <Spinner />,
});
const CreateElection = dynamic(() => import("../components/CreateElection"), {
  loading: () => <Spinner />,
});

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [voterData, setVoterData] = useState<dataInterface>();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const createElection = async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const voterData = await res.json();
    setIsLoading(false);
    setVoterData(voterData);
  };

  return (
    <Layout>
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
