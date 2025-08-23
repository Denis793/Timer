import { useState, useEffect, useRef, useCallback } from 'react';

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 16);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggle = useCallback(() => setIsRunning((p) => !p), []);
  const reset = useCallback(() => {
    setElapsedTime(0);
    setIsRunning(false);
  }, []);

  const mm = Math.floor(elapsedTime / 60000);
  const ss = Math.floor((elapsedTime % 60000) / 1000);
  const cs = Math.floor((elapsedTime % 1000) / 10);

  return {
    timeFormatted: `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(cs).padStart(2, '0')}`,
    isRunning,
    toggle,
    reset,

    hoursValue: (elapsedTime / 3600000) % 24,
    minutesValue: (elapsedTime / 60000) % 60,
    secondsValue: (elapsedTime / 1000) % 60,
  };
};
