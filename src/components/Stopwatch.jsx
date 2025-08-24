import React, { useEffect } from 'react';
import { useStopwatch } from '../hooks/useStopwatch';
import { CircularDial } from './CircularDial';
import { CircleButton } from './ui/CircleButton';
import { ControlsRow } from './ui/ControlsRow';
import resetIcon from '@/assets/img/icons/reset.png';
import playIcon from '@/assets/img/icons/play.png';
import pauseIcon from '@/assets/img/icons/pause.png';
import flagIcon from '@/assets/img/icons/flag.png';

export const Stopwatch = ({ onSave, onRunningChange }) => {
  const { timeFormatted, isRunning, toggle, reset, hoursValue, minutesValue, secondsValue } = useStopwatch();

  useEffect(() => {
    onRunningChange?.(isRunning);
  }, [isRunning, onRunningChange]);

  return (
    <div className="stopwatch-card" data-running={isRunning}>
      <h2 className="app-title">Stopwatch</h2>

      <CircularDial hours={hoursValue} minutes={minutesValue} seconds={secondsValue} />

      <div className="time-readout">{timeFormatted}</div>

      <ControlsRow>
        <CircleButton ariaLabel="reset stopwatch" icon={resetIcon} onClick={reset} />
        <CircleButton
          ariaLabel={isRunning ? 'pause stopwatch' : 'start stopwatch'}
          icon={isRunning ? pauseIcon : playIcon}
          primary
          onClick={toggle}
        />
        <CircleButton ariaLabel="save lap" icon={flagIcon} onClick={() => onSave?.(timeFormatted)} />
      </ControlsRow>
    </div>
  );
};
