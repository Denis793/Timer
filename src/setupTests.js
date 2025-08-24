import '@testing-library/jest-dom';

Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn().mockResolvedValue(),
});
Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: vi.fn(),
});

vi.stubGlobal('requestAnimationFrame', (cb) => setTimeout(() => cb(performance.now()), 16));
vi.stubGlobal('cancelAnimationFrame', (id) => clearTimeout(id));
vi.useFakeTimers();

if (!SVGElement.prototype.getBBox) {
  SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 100, height: 100 });
}
if (!SVGElement.prototype.getBoundingClientRect) {
  SVGElement.prototype.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    width: 260,
    height: 260,
    right: 260,
    bottom: 260,
  });
}
