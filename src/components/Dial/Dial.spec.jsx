import { render, fireEvent } from '@testing-library/react';
import { Dial } from './Dial';

function clickAt(el, clientX, clientY) {
  fireEvent.pointerDown(el, { clientX, clientY, pointerId: 1 });
  fireEvent.pointerMove(el, { clientX, clientY, pointerId: 1 });
  fireEvent.pointerUp(el, { clientX, clientY, pointerId: 1 });
}

describe('Dial', () => {
  it('calls onRingChange when dragging seconds ring', () => {
    const onRingChange = vi.fn();
    const rings = [
      {
        key: 'hours',
        radius: 110,
        value: 0,
        max: 24,
        baseClass: 'ring--outer',
        progClass: 'ring-prog--hours',
        dotClass: 'dot--hours',
        interactive: false,
      },
      {
        key: 'minutes',
        radius: 85,
        value: 0,
        max: 60,
        baseClass: 'ring--mid',
        progClass: 'ring-prog--minutes',
        dotClass: 'dot--minutes',
        interactive: false,
      },
      {
        key: 'seconds',
        radius: 60,
        value: 0,
        max: 60,
        baseClass: 'ring--inner',
        progClass: 'ring-prog--seconds',
        dotClass: 'dot--seconds',
        interactive: true,
      },
    ];

    const { container } = render(<Dial rings={rings} onRingChange={onRingChange} />);
    const secArc = container.querySelector('.ring-prog--seconds');
    expect(secArc).toBeInTheDocument();

    clickAt(secArc, 260 - 10, 130);

    expect(onRingChange).toHaveBeenCalled();
    expect(onRingChange.mock.calls[0][0]).toBe('seconds');
    expect(typeof onRingChange.mock.calls[0][1]).toBe('number');
  });
});
