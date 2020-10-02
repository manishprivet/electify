import { useState, useRef } from 'react';
import RadioButton from './RadioButton';
import { data as dataInterface } from '../interfaces/data';

const pattern = /^[a-zA-Z]+$/;

const App: React.FC<{ createElection: (data: dataInterface) => Promise<null> }> = ({
  createElection,
}) => {
  const [electionName, setElectionName] = useState('');
  const [electionId, setElectionId] = useState('');
  const [noOfVoters, setNoOfVoters] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState('');
  const [errors, setErrors] = useState('');
  const [authType, setAuthType] = useState(-1);
  const [emails, setEmails] = useState('');
  const [gsuite, setGsuite] = useState('');
  const newCandidateBox = useRef<HTMLInputElement>();
  const emailBox = useRef<HTMLInputElement>();
  const noOfVotersBox = useRef<HTMLInputElement>();
  const gsuiteBox = useRef<HTMLInputElement>();

  const setAuthenticationType = (i) => {
    // eslint-disable-next-line eqeqeq
    if (i == 0) {
      gsuiteBox.current.classList.remove('active');
      noOfVotersBox.current.classList.remove('active');
      emailBox.current.classList.add('active');
      // eslint-disable-next-line eqeqeq
    } else if (i == 1) {
      gsuiteBox.current.classList.add('active');
      emailBox.current.classList.remove('active');
      noOfVotersBox.current.classList.remove('active');
    } else {
      gsuiteBox.current.classList.remove('active');
      emailBox.current.classList.remove('active');
      noOfVotersBox.current.classList.add('active');
    }
    setAuthType(i);
  };

  const removeCandidate = (index: number) => {
    setCandidates((c) => {
      const cNew = [...c];
      cNew.splice(index, 1);
      return cNew;
    });
  };

  const addCandidate = async () => {
    setCandidates((c) => {
      const cNew = [...c];
      cNew.push({ name: newCandidate });
      return cNew;
    });
    setNewCandidate('');
    newCandidateBox.current.focus();
  };

  const changePreviousCandidate = (i: number, v: string) => {
    setCandidates((c) => {
      const cNew = [...c];
      cNew[i].name = v;
      return cNew;
    });
  };

  // eslint-disable-next-line consistent-return
  const createElectionData = () => {
    if (
      !electionName ||
      !electionId ||
      authType < 0 ||
      // eslint-disable-next-line eqeqeq
      (authType == 2 && !noOfVoters) ||
      // eslint-disable-next-line eqeqeq
      (authType == 0 && !emails) ||
      // eslint-disable-next-line eqeqeq
      (authType == 1 && !gsuite) ||
      !candidates.length
    )
      return setErrors('All values are required.');
    if (!pattern.test(electionId)) return setErrors(`Election id can only contain alphabets`);
    if (parseInt(noOfVoters, 10) > 10000) return setErrors(`Number of voters can't be more than`);
    const c = [...candidates];
    c.forEach((candidate, index) => (candidate.name === '' ? c.splice(index, 1) : null));
    const data = {
      display_name: electionName.trim(),
      election_name: electionId.toLowerCase().trim(),
      no_of_voters: noOfVoters,
      candidates: c,
      // eslint-disable-next-line eqeqeq
      auth_type: authType == 0 ? 'google' : authType == 1 ? 'gsuite' : 'secret',
      emails: emails.trim(),
      gsuite_domain: gsuite.trim(),
    };
    createElection(data);
  };

  return (
    <main className="container">
      <h1>Create an Election</h1>
      <label htmlFor="election-name">Election Name</label>
      <input
        onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
        onChange={(e) => setElectionName(e.target.value)}
        type="text"
        id="election-name"
        placeholder="A proper name for your Election"
      />
      <span />
      <label htmlFor="election-id">Election ID</label>
      <input
        onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
        onChange={(e) => setElectionId(e.target.value)}
        type="text"
        id="election-id"
        placeholder="Give your election an unique id"
      />
      <span />
      <div className="candidates">
        <h2>Choose Candidates</h2>
        {candidates.map((candidate, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`candidate-${index}`} className="candidate">
            <input
              onKeyPress={(e) => (e.charCode === 13 ? newCandidateBox.current.focus() : null)}
              value={candidate.name}
              onChange={(e) => changePreviousCandidate(index, e.target.value)}
              type="text"
            />
            <button
              type="button"
              aria-label="remove candidate"
              onClick={() => removeCandidate(index)}
              className="remove-candidate"
            >
              <div className="plus remove" />
            </button>
          </div>
        ))}
        <div className="candidate new-candidate">
          <input
            id="new-candidate"
            ref={newCandidateBox}
            onKeyPress={(e) => (e.charCode === 13 ? addCandidate() : null)}
            value={newCandidate}
            onChange={(e) => setNewCandidate(e.target.value)}
            type="text"
          />
          <button
            type="button"
            disabled={newCandidate === ''}
            className="add-candidate"
            onClick={addCandidate}
            aria-label="Add Candidate"
          >
            <div className="plus" />
          </button>
        </div>
      </div>
      <label htmlFor="auth-type">Select Auth Type</label>
      <RadioButton
        array={['Google / Gsuite Email', 'Gsuite Domain', 'Voter ID and Secret']}
        setIndex={setAuthenticationType}
        id="auth-type"
      />
      <div ref={emailBox} className="emails c-flex">
        <label htmlFor="emails">Enter emails seperated by commas</label>
        <p>We&apos;ll ask voters to verify their email by google.</p>
        <textarea
          id="emails"
          placeholder="email1@gmail.com,email2@gmail.com,email3..."
          onChange={(e) => setEmails(e.target.value)}
        />
      </div>
      <div ref={gsuiteBox} className="voters">
        <label htmlFor="gsuite-domain">Gsuite Domain Name</label>
        <p>We&apos;ll ask voters to verify their email by google.</p>
        <input
          onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
          onChange={(e) => setGsuite(e.target.value)}
          type="text"
          id="gsuite-domain"
          placeholder="gsuitedomain.com"
        />
        <span />
      </div>
      <div ref={noOfVotersBox} className="voters">
        <label htmlFor="no-of-voters">Number of Voters</label>
        <p>Each voter will get a id and secret upon Election Creation.</p>
        <input
          onKeyPress={(e) => (e.charCode === 13 ? createElectionData() : null)}
          onChange={(e) => setNoOfVoters(e.target.value)}
          type="text"
          id="no-of-voters"
          placeholder={`Number of Voters that'll be participating`}
        />
        <span />
      </div>
      {errors ? <p className="error">{errors}</p> : null}
      <button type="button" onClick={createElectionData}>
        Create
      </button>
      <style jsx>{`
        .candidates {
          position: relative;
          height: auto;
          width: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
        }
        .candidates h2 {
          font-size: 2em;
          margin: 20px 0;
        }
        .candidates input {
          width: 75%;
          border: 1px solid var(--text-color);
        }
        .candidates .candidate {
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-around;
        }

        .candidates .candidate button {
          margin: 0 15px;
          border: none;
          background: none;
          padding: 0;
        }
        .plus {
          display: inline-block;
          width: 50px;
          height: 50px;
          border: none;

          background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), var(--button-color);
          background-position: center;
          background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
          background-repeat: no-repeat;
          border-radius: 50%;
        }

        .plus.remove {
          transform: rotate(45deg);
        }

        .emails {
          width: 100%;
          flex-flow: column nowrap;
          height: 0;
          transform-origin: 0 0;
          transform: scale(1, 0);
          transition: all 0.3s ease-out;
        }

        .voters {
          width: 100%;
          height: 0;
          transform-origin: 0 0;
          transform: scale(1, 0);
          transition: all 0.3s ease-out;
          margin-top: 20px;
        }

        .emails.active {
          height: 313px;
          transform: scale(1, 1);
        }

        .voters.active {
          height: auto;
          transform: scale(1, 1);
        }

        .emails p,
        .voters p {
          color: var(--highlight-color);
          font-size: 1.2em;
          justify-self: start;
          margin-right: auto;
          margin-left: 10px;
        }

        .emails textarea {
          width: 90%;
          height: 150px;
          resize: vertical;
          margin: 10px 0;
          background: var(--background-color);
          outline: none;
          border: 2px solid var(--highlight-color);
          color: var(--text-color);
          caret-color: var(--text-color);
          border-radius: 20px;
          padding: 15px 10px;
          font-size: 1.3em;
        }
      `}</style>
    </main>
  );
};

export default App;
