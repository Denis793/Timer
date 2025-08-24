import { render, screen, fireEvent } from '@testing-library/react';
import { Countdown } from '@/components/Countdown.jsx';

vi.mock('@/assets/img/icons/reset.png', () => ({ default: 'reset.png' }));
vi.mock('@/assets/img/icons/play.png', () => ({ default: 'play.png' }));
vi.mock('@/assets/img/icons/pause.png', () => ({ default: 'pause.png' }));
vi.mock('@/assets/sound/alarm.mp3', () => ({ default: 'alarm.mp3' }));

test('Countdown: start requires time > 0', () => {
  const onRunningChange = vi.fn();
  render(<Countdown onRunningChange={onRunningChange} />);

  const startBtn = screen.getByRole('button', { name: /start timer/i });
  fireEvent.click(startBtn);
  expect(onRunningChange).not.toHaveBeenCalledWith(true);
});
