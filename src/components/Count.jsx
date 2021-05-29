import React, { useState } from 'react';
import { APP_NAME } from '../constants';

/* istanbul ignore next */
const { title } = typeof document !== 'undefined' ? document : {};

const Count = () => {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    document.title = `${title} (${count})`;
  }, [count]);

  return (
    <>
      <h1>{APP_NAME}</h1>
      <div>{`The button has been clicked ${count} times.`}</div>
      <button className="primary center" type="button" label="click this" onClick={() => setCount(count + 1)}>Click this</button>
    </>
  );
};

export default Count;
