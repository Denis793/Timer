import { useState, useEffect, useRef, useCallback } from 'react';

export const useCountdown = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const alarmRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 10) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (alarmRef.current) {
              alarmRef.current.play(); // відтворюємо звук
            }
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggle = useCallback(() => setIsRunning((prev) => !prev), []);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  const setNewTime = (newTime) => {
    setTimeLeft(newTime);
    setIsRunning(false);
  };

  const minutes = String(Math.floor(timeLeft / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(Math.floor((timeLeft % 1000) / 10)).padStart(2, '0');

  return {
    timeFormatted: `${minutes}:${seconds}:${milliseconds}`,
    isRunning,
    toggle,
    reset,
    setNewTime,
    alarmRef,
  };
};
