import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
  it('counts down to zero and plays alarm', async () => {
    const { result } = renderHook(() => useCountdown(0));

    const audio = document.createElement('audio');
    act(() => {
      result.current.alarmRef.current = audio;
      result.current.start(3000);
    });

    await act(async () => {
      vi.advanceTimersByTime(3050);
    });

    expect(result.current.timeLeftMs).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('pause / resume via toggle()', async () => {
    const { result } = renderHook(() => useCountdown(0));
    act(() => {
      result.current.alarmRef.current = document.createElement('audio');
      result.current.start(5000);
    });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    act(() => {
      result.current.toggle();
    });
    const left = result.current.timeLeftMs;
    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.toggle();
    });
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.timeLeftMs).toBeLessThan(left);
  });
});
