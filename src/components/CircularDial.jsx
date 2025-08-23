import React from 'react';
import { Dial } from '@/components/Dial';

export function CircularDial({ hours, minutes, seconds }) {
  const rings = [
    {
      key: 'hours',
      radius: 110,
      value: hours % 24,
      max: 24,
      baseClass: 'ring--outer',
      progClass: 'ring-prog--hours',
      dotClass: 'dot--hours',
      interactive: false,
    },
    {
      key: 'minutes',
      radius: 85,
      value: minutes % 60,
      max: 60,
      baseClass: 'ring--mid',
      progClass: 'ring-prog--minutes',
      dotClass: 'dot--minutes',
      interactive: false,
    },
    {
      key: 'seconds',
      radius: 60,
      value: seconds % 60,
      max: 60,
      baseClass: 'ring--inner',
      progClass: 'ring-prog--seconds',
      dotClass: 'dot--seconds',
      interactive: false,
    },
  ];
  return <Dial rings={rings} ticks={60} showNumbers />;
}
