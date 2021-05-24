/* eslint-disable consistent-return */
import { useState } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import RadioButton from './RadioButton';
import { data as dataInterface, voteInterface } from '../interfaces/data';

const VotingScreen: React.FC<{
  data: dataInterface;
  vote: (() => unknown) | ((object: voteInterface) => unknown);
  errors: string;
  setErrors: React.Dispatch<React.SetStateAction<string>>;
}> = ({ data, vote, errors, setErrors }) => {
  const [voterId, setVoterId] = useState('');
  const [voterSecret, setVoterSecret] = useState('');
  const [cIndex, setCIndex] = useState(-1);

  const responseGoogle = (response: GoogleLoginResponse) => {
    // eslint-disable-next-line consistent-return
    return vote({ cIndex, authType: data.auth_type, tokenId: response.tokenId });
  };

  const failGoogle = (response: { error: string }) => {
    if (response.error === 'idpiframe_initialization_failed') return;
    return setErrors('Oops! Something went wrong with email verification.');
  };

  return (
    <div className="container">
      <h1>
        Vote Now for <span style={{ color: 'var(--button-color)' }}>{data.display_name}</span>
      </h1>
      {data.auth_type === 'secret' ? (
        <div>
          <label htmlFor="voter-id">Voter ID</label>
          <input
            onKeyPress={(e) =>
              e.charCode === 13 ? vote({ authType: 'secret', voterId, voterSecret }) : null
            }
            onChange={(e) => setVoterId(e.target.value)}
            type="text"
            id="voter-id"
            placeholder="Your Voter ID"
          />
          <span />
          <label htmlFor="voter-secret">Voter Secret</label>
          <input
            onKeyPress={(e) =>
              e.charCode === 13 ? vote({ authType: 'secret', voterId, voterSecret }) : null
            }
            onChange={(e) => setVoterSecret(e.target.value)}
            type="text"
            id="voter-secret"
            placeholder="Your Secret Key"
          />
          <span />
        </div>
      ) : null}
      <label htmlFor="candidate-list">Candidates</label>
      <RadioButton
        array={data.candidates}
        id="candidate-list"
        objectKey="name"
        setIndex={setCIndex}
      />
      {errors ? <p className="error">{errors}</p> : null}

      {data.auth_type === 'secret' ? (
        <button
          type="submit"
          onClick={() => vote({ voterId, voterSecret, cIndex, authType: 'secret' })}
        >
          VOTE
        </button>
      ) : (
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <button
              type="submit"
              className="c-flex"
              onClick={() =>
                cIndex < 0 ? setErrors('Choose a candidate!') : renderProps.onClick()
              }
              disabled={renderProps.disabled}
            >
              <img src="/google.png" alt="Google Logo" />
              VOTE
            </button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={failGoogle}
          cookiePolicy="single_host_origin"
          scope="email"
        />
      )}
      {data.auth_type === 'secret' ? null : (
        <p className="privacy">
          We&apos;re only asking your email for verification purpose. We do not use it for any
          marketing or spamming purposes. We do not collect any of your data other than your email
          and store it only till an election is valid.
        </p>
      )}
      <style jsx>{`
        .privacy {
          color: var(--highlight-color);
          font-size: 1.2em;
          justify-self: start;
          margin-right: auto;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default VotingScreen;
