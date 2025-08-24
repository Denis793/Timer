import { renderHook, act } from '@testing-library/react';
import { useStopwatch } from './useStopwatch';

describe('useStopwatch', () => {
  it('starts, accumulates time, resets', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isRunning).toBe(true);

    act(() => {
      vi.advanceTimersByTime(550);
    });
    const t1 = result.current.timeFormatted;

    act(() => {
      vi.advanceTimersByTime(500);
    });
    const t2 = result.current.timeFormatted;
    expect(t2).not.toEqual(t1);

    act(() => {
      result.current.reset();
    });
    expect(result.current.isRunning).toBe(false);
    expect(result.current.timeFormatted.startsWith('00:00')).toBe(true);
  });
});
