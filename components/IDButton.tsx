import { useRef } from 'react';

const App: React.FC<{ text: string; long?: boolean }> = ({ text, long }) => {
  const btn = useRef<HTMLInputElement>();

  const copy = () => {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    btn.current.style.setProperty('--text-content', '"Copied"');
    return result;
  };

  const exit = () => {
    setTimeout(() => btn.current.style.setProperty('--text-content', '"Click to Copy"'), 200);
  };

  return (
    <button type="button" ref={btn} onBlur={exit} onMouseOut={exit} onClick={copy}>
      Copy
      <style jsx>{`
        button {
          position: relative;
          background: none;
          border: 1px solid var(--text-color);
          padding: 7px 25px;
          color: var(--text-color);
          font-size: 1em;
          margin: ${long ? '20px' : '0'} 15px;
          border-radius: 20px;
          outline: none;
          --text-content: 'Click to copy';
        }

        button:hover {
          cursor: pointer;
          background: none;
          color: var(--text-color);
        }

        button:hover::after {
          visibility: visible;
          opacity: 1;
          transform: translateY(-180%) translateX(-35%);
          color: #fff;
        }

        button::after {
          content: var(--text-content);
          position: absolute;
          height: 100%;
          width: 100%;
          border: none;
          margin: 0;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8em;
          background: #000000df;
          border-radius: 10px;
          transform: translateY(-180%) translateX(-35%);
          visibility: hidden;
          opacity: 0;
          transition: all 0.2s ease-out;
          pointer-events: none;
        }
      `}</style>
    </button>
  );
};

export default App;
