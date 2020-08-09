import { useEffect, useRef } from 'react';

const App: React.FC<{ progress: number; total: number }> = ({ progress, total }) => {
  const bar = useRef<HTMLSpanElement>();
  const container = useRef<HTMLDivElement>();
  useEffect(() => {
    const percentage = Math.floor((progress * 100) / total);
    let p = 0;
    const i = setInterval(() => {
      // eslint-disable-next-line no-plusplus
      bar.current.style.setProperty('width', `${p++}%`);
      container.current.style.setProperty('filter', `hue-rotate(${p / 100}turn)`);
      if (p > percentage || !percentage) clearInterval(i);
    }, 5);
  }, [total, progress]);

  return (
    <div ref={container} className="progressBar">
      <span ref={bar} />
      <style jsx>{`
        .progressBar {
          width: calc(80% - 4px);
          height: 20px;
          border: 2px solid var(--button-color);
          border-radius: 20px;
          position: relative;
        }

        .progressBar span {
          content: '';
          position: absolute;
          background: var(--button-color);
          height: 20px;
          width: 0%;
          border: none;
          border-radius: 20px;
          transition: width 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
