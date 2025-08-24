import React, { useEffect, useMemo, useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { CircleButton } from './ui/CircleButton';
import { ControlsRow } from './ui/ControlsRow';
import TimeSetterDial from './TimeSetterDial';
import alarmSound from '@/assets/sound/alarm.wav';
import resetIcon from '@/assets/img/icons/reset.png';
import playIcon from '@/assets/img/icons/play.png';
import pauseIcon from '@/assets/img/icons/pause.png';

const pad2 = (n) => String(n).padStart(2, '0');

export const Countdown = ({ onRunningChange }) => {
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);

  const { isRunning, start, toggle, reset, alarmRef, timeLeftMs } = useCountdown(0);

  useEffect(() => {
    onRunningChange?.(isRunning);
  }, [isRunning, onRunningChange]);

  const totalMs = useMemo(() => (h * 3600 + m * 60 + s) * 1000, [h, m, s]);

  const handleStart = () => {
    if (totalMs > 0) start(totalMs);
  };
  const handleReset = () => {
    reset();
    setH(0);
    setM(0);
    setS(0);
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  const runningH = isRunning ? Math.floor(timeLeftMs / 3600000) : null;
  const runningM = isRunning ? Math.floor((timeLeftMs % 3600000) / 60000) : null;
  const runningS = isRunning ? Math.floor((timeLeftMs % 60000) / 1000) : null;

  return (
    <div className="stopwatch-card" data-running={isRunning}>
      <h2 className="app-title">Timer</h2>
      <TimeSetterDial
        hours={h}
        minutes={m}
        seconds={s}
        runningHours={runningH}
        runningMinutes={runningM}
        runningSeconds={runningS}
        isRunning={isRunning}
        onChange={({ hours, minutes, seconds }) => {
          if (typeof hours === 'number') setH(hours);
          if (typeof minutes === 'number') setM(minutes);
          if (typeof seconds === 'number') setS(seconds);
        }}
      />
      <div className="time-readout">
        {isRunning
          ? `${pad2(runningH ?? 0)}:${pad2(runningM ?? 0)}:${pad2(runningS ?? 0)}`
          : `${pad2(h)}:${pad2(m)}:${pad2(s)}`}
      </div>

      <ControlsRow>
        <CircleButton ariaLabel="reset timer" icon={resetIcon} onClick={handleReset} />
        <CircleButton
          ariaLabel={isRunning ? 'pause timer' : 'start timer'}
          icon={isRunning ? pauseIcon : playIcon}
          primary
          onClick={isRunning ? toggle : handleStart}
        />
      </ControlsRow>
      <audio ref={alarmRef} src={alarmSound} preload="auto" />
    </div>
  );
};
