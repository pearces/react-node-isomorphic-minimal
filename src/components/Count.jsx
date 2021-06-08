import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions/count';
import { APP_NAME } from '../constants';
import './Count.scss';

/* istanbul ignore next */
const { title } = typeof document !== 'undefined' ? document : {};

const Count = () => {
  const storeCount = useSelector((state) => state.count);
  const dispatch = useDispatch();

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
    </>
  );
};

export default Count;
