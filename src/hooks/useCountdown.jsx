import { useState, useEffect, useRef, useCallback } from 'react';

export const useCountdown = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, _setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const isRunningRef = useRef(false);
  const alarmRef = useRef(null);
  const rafRef = useRef(null);
  const endAtRef = useRef(null);
  const lastLeftRef = useRef(timeLeft);

  const setIsRunning = (v) => {
    isRunningRef.current = typeof v === 'function' ? v(isRunningRef.current) : v;
    _setIsRunning(isRunningRef.current);
  };

  const clearRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const tick = useCallback(() => {
    rafRef.current = requestAnimationFrame(() => {
      if (!isRunningRef.current || endAtRef.current == null) return;

      const now = performance.now();
      const left = Math.max(0, Math.round(endAtRef.current - now));

      if (left <= 0) {
        setIsRunning(false);
        setIsFinished(true);
        setTimeLeft(0);
        endAtRef.current = null;

        const a = alarmRef.current;
        if (a) {
          try {
            a.pause();
            a.currentTime = 0;
            a.volume = 1;
            a.play();
          } catch {}
        }
        clearRaf();
        return;
      }

      if (left !== lastLeftRef.current) {
        lastLeftRef.current = left;
        setTimeLeft(left);
      }
      tick();
    });
  }, []);

  const start = useCallback(
    (ms) => {
      const duration = Math.max(0, Number(ms ?? initialTime));
      lastLeftRef.current = duration;
      setTimeLeft(duration);
      setIsFinished(false);
      endAtRef.current = performance.now() + duration;
      setIsRunning(true);
      clearRaf();
      tick();
    },
    [initialTime, tick]
  );

  const stop = useCallback(() => {
    setIsRunning(false);
    clearRaf();
    lastLeftRef.current = timeLeft;
  }, [timeLeft]);

  const toggle = useCallback(() => {
    if (isRunningRef.current) {
      // pause
      setIsRunning(false);
      clearRaf();
      lastLeftRef.current = timeLeft;
    } else {
      // resume
      endAtRef.current = performance.now() + lastLeftRef.current;
      setIsFinished(false);
      setIsRunning(true);
      clearRaf();
      tick();
    }
  }, [timeLeft, tick]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsFinished(false);
    clearRaf();
    lastLeftRef.current = initialTime;
    setTimeLeft(initialTime);
    endAtRef.current = null;
    const a = alarmRef.current;
    if (a) {
      try {
        a.pause();
        a.currentTime = 0;
      } catch {}
    }
  }, [initialTime]);

  const setNewTime = useCallback((newTime) => {
    const ms = Math.max(0, Number(newTime) || 0);
    setIsRunning(false);
    setIsFinished(false);
    clearRaf();
    lastLeftRef.current = ms;
    setTimeLeft(ms);
    endAtRef.current = null;
  }, []);

  useEffect(() => () => clearRaf(), []);

  const mm = Math.floor(timeLeft / 60000);
  const ss = Math.floor((timeLeft % 60000) / 1000);
  const cs = Math.floor((timeLeft % 1000) / 10);

  return {
    timeFormatted: `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(cs).padStart(2, '0')}`,
    minutes: mm,
    seconds: ss,
    centiseconds: cs,
    timeLeftMs: timeLeft,
    isRunning,
    isFinished,
    start,
    stop,
    toggle,
    reset,
    setNewTime,
    alarmRef,
  };
};
