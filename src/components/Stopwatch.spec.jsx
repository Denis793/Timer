import { render, screen, fireEvent } from '@testing-library/react';
import { Stopwatch } from '@/components/Stopwatch.jsx';

vi.mock('@/assets/img/icons/reset.png', () => ({ default: 'reset.png' }));
vi.mock('@/assets/img/icons/play.png', () => ({ default: 'play.png' }));
vi.mock('@/assets/img/icons/pause.png', () => ({ default: 'pause.png' }));
vi.mock('@/assets/img/icons/flag.png', () => ({ default: 'flag.png' }));

test('Stopwatch renders and toggles play/pause', () => {
  const onSave = vi.fn();
  const onRunningChange = vi.fn();
  render(<Stopwatch onSave={onSave} onRunningChange={onRunningChange} />);

  const playBtn = screen.getByRole('button', { name: /start stopwatch/i });
  fireEvent.click(playBtn);
  expect(onRunningChange).toHaveBeenCalledWith(true);

  const pauseBtn = screen.getByRole('button', { name: /pause stopwatch/i });
  fireEvent.click(pauseBtn);
  expect(onRunningChange).toHaveBeenCalledWith(false);
});
