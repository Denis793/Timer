import React, { useMemo } from 'react';
import { Dial } from './Dial';

export function TimeSetterDial({
  hours = 0,
  minutes = 0,
  seconds = 0,
  runningHours = null,
  runningMinutes = null,
  runningSeconds = null,
  isRunning = false,
  onChange,
}) {
  const h = runningHours ?? hours;
  const m = runningMinutes ?? minutes;
  const s = runningSeconds ?? seconds;

  const rings = useMemo(
    () => [
      {
        key: 'hours',
        radius: 110,
        value: h % 24,
        max: 24,
        baseClass: 'ring--outer',
        progClass: 'ring-prog--hours',
        dotClass: 'dot--hours',
        interactive: !isRunning,
      },
      {
        key: 'minutes',
        radius: 85,
        value: m % 60,
        max: 60,
        baseClass: 'ring--mid',
        progClass: 'ring-prog--minutes',
        dotClass: 'dot--minutes',
        interactive: !isRunning,
      },
      {
        key: 'seconds',
        radius: 60,
        value: s % 60,
        max: 60,
        baseClass: 'ring--inner',
        progClass: 'ring-prog--seconds',
        dotClass: 'dot--seconds',
        interactive: !isRunning,
      },
    ],
    [h, m, s, isRunning]
  );

  const handleRingChange = (key, val) => {
    onChange?.({ hours, minutes, seconds, [key]: val });
  };

  return <Dial rings={rings} disabled={isRunning} onRingChange={handleRingChange} />;
}
