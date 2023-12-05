import React, { useState, lazy, Suspense, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from 'actions/count';
import { getDate } from 'actions/date';
import { APP_NAME } from '../constants';
import { ThemeContext } from '../context/ThemeContext';
import './Count.scss';

/* istanbul ignore next */
const { title } = typeof document !== 'undefined' ? document : {};

const delayedPromise = (promise, delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  }).then(() => promise);

const LazyComponent = lazy(() => delayedPromise(import('./Lazy'), 1500));

const Count = () => {
  const storeCount = useSelector(({ count }) => count);
  const { message, status } = useSelector(({ date }) => date);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [count, setCount] = useState(0);

  React.useEffect(() => {
    document.title = `${title} (${storeCount})`;
  }, [storeCount]);

  return (
    <>
      <h1>{APP_NAME}</h1>
      <section>
        <h2>Redux counter</h2>
        <div>
          <p>{`The button has been clicked ${storeCount} times.`}</p>
          <button
            id="storeButton"
            className="primary center"
            type="button"
            label="click this"
            onClick={() => dispatch(increment())}
          >
            Click this
          </button>
        </div>
      </section>
      <section>
        <h2>Component counter</h2>
        <div>
          <p>{`The button has been clicked ${count} times.`}</p>
          <button
            id="stateButton"
            className="primary center"
            type="button"
            label="click this"
            onClick={() => setCount(count + 1)}
          >
            Click this
          </button>
        </div>
      </section>
      <section>
        <h2>Date API</h2>
        <div>
          <p>{`The date and time on the server is ${message} and the status is ${status}.`}</p>
          <button
            id="apiButton"
            className="primary center"
            type="button"
            label="get API date/time"
            onClick={() => dispatch(getDate())}
          >
            Click this
          </button>
        </div>
      </section>
      <section>
        <h2>Client-side Lazy loading</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      </section>
      <section>
        <h2>Context</h2>
        <div>
          <p>{`The current theme is ${theme}.`}</p>
          <button id="toggleTheme" className="primary center" type="button" onClick={toggleTheme}>
            Toggle
          </button>
        </div>
      </section>
    </>
  );
};

export default Count;
