import React from 'react';
import { useStopwatch } from '../hooks/useStopwatch';

const Stopwatch = () => {
  const { timeFormatted, isRunning, toggle, reset } = useStopwatch();

  return (
    <div className="timer-container">
      <h1>{timeFormatted}</h1>

      <div className="buttons">
        <button onClick={toggle}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
