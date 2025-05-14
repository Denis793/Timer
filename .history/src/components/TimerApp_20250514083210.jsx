import React, { useState } from 'react';
import Stopwatch from './Stopwatch';
import Countdown from './Countdown';

const TimerApp = () => {
  const [mode, setMode] = useState('stopwatch');

  return (
    <div className="timer-container">
      <div className="mode-switch">
        <button onClick={() => setMode('stopwatch')}>Stopwatch</button>
        <button onClick={() => setMode('countdown')}>Timer</button>
      </div>
      {mode === 'stopwatch' ? <Stopwatch /> : <Countdown />}
    </div>
  );
};

export default TimerApp;
