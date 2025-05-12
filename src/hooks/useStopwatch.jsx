import { useState, useEffect, useRef, useCallback } from 'react';

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggle = useCallback(() => setIsRunning((prev) => !prev), []);

  const reset = useCallback(() => {
    setElapsedTime(0);
    setIsRunning(false);
  }, []);

  const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

  return {
    timeFormatted: `${minutes}:${seconds}:${milliseconds}`,
    isRunning,
    toggle,
    reset,
    renderCount: renderCount.current,
  };
};
