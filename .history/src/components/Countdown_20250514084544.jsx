import React, { useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import alarmSound from '../assets/alarm.mp3';

const Countdown = () => {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const { timeFormatted, isRunning, toggle, reset: countdownReset, setNewTime, alarmRef } = useCountdown(0);

  const handleStart = () => {
    const totalTimeInMs = (inputMinutes * 60 + inputSeconds) * 1000;
    if (totalTimeInMs > 0) {
      setNewTime(totalTimeInMs);
      toggle();
    }
  };

  const handleReset = () => {
    countdownReset();
    setInputMinutes(0);
    setInputSeconds(0);
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  return (
    <div className="timer-box">
      <h1>{timeFormatted}</h1>
      <div className="inputs">
        <label>
          Minutes:
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(Number(e.target.value))}
            disabled={isRunning}
            min="0"
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(Number(e.target.value))}
            disabled={isRunning}
            min="0"
            max="59"
          />
        </label>
      </div>

      <div className="buttons">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={toggle}>{isRunning ? 'Pause' : 'Resume'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <audio ref={alarmRef} src={alarmSound} />
    </div>
  );
};

export default Countdown;
