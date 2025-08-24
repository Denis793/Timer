import React, { useMemo, useRef, useState } from 'react';
import './Dial.scss';

const TAU = Math.PI * 2;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export function Dial({ size = 260, ticks = 60, showNumbers = true, rings = [], disabled = false, onRingChange }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = useMemo(() => (rings.length ? Math.max(...rings.map((r) => r.radius)) : 110), [rings]);

  const svgRef = useRef(null);
  const [dragKey, setDragKey] = useState(null);

  const angleFromPoint = (x, y) => Math.atan2(y - cy, x - cx);
  const valueToAngle = (value, max) => (value / max) * TAU - Math.PI / 2;
  const angleToValue = (angle, max) => {
    let a = angle + Math.PI / 2;
    while (a < 0) a += TAU;
    while (a >= TAU) a -= TAU;
    const part = a / TAU;
    return Math.round(part * max) % max;
  };
  const dash = (value, max, r) => {
    const C = TAU * r;
    const filled = (value / max) * C;
    return `${filled} ${C - filled}`;
  };

  const move = (e, key = dragKey) => {
    if (!key || disabled) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    const ring = rings.find((r) => r.key === key);
    if (!ring) return;
    const angle = angleFromPoint(x, y);
    const newVal = angleToValue(angle, ring.max);
    onRingChange?.(key, newVal);
  };

  const startDrag = (key) => (e) => {
    if (disabled) return;
    setDragKey(key);
    const svg = svgRef.current;
    if (svg && typeof e.pointerId === 'number') {
      try {
        svg.setPointerCapture(e.pointerId);
      } catch {}
    }
    move(e, key);
    e.preventDefault();
  };

  const endDrag = (e) => {
    const svg = svgRef.current;
    if (svg && typeof e?.pointerId === 'number') {
      try {
        svg.releasePointerCapture(e.pointerId);
      } catch {}
    }
    setDragKey(null);
  };

  return (
    <div className="dial">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onPointerMove={move}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        style={{ touchAction: 'none' }}
      >
        <circle cx={cx} cy={cy} r={outerRadius + 8} className="dial-bg" />

        <g className="dial-ticks" style={{ pointerEvents: 'none' }}>
          {Array.from({ length: ticks }).map((_, i) => {
            const a = (i / ticks) * TAU - Math.PI / 2;
            const long = i % 5 === 0;
            const r1 = outerRadius - (long ? 18 : 12);
            const r2 = outerRadius - 6;
            const x1 = cx + r1 * Math.cos(a);
            const y1 = cy + r1 * Math.sin(a);
            const x2 = cx + r2 * Math.cos(a);
            const y2 = cy + r2 * Math.sin(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {rings.map((r) => (
          <circle key={`${r.key}-base`} cx={cx} cy={cy} r={r.radius} className={`ring ${r.baseClass ?? ''}`} />
        ))}

        {rings.map((r) => {
          const a = valueToAngle(r.value % r.max, r.max);
          const pointer = r.interactive && !disabled ? 'auto' : 'none';
          return (
            <g key={`${r.key}-prog`}>
              {r.progClass && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={r.radius}
                  className={`ring-prog ${r.progClass}`}
                  style={{
                    strokeDasharray: dash(r.value % r.max, r.max, r.radius),
                    pointerEvents: pointer,
                    touchAction: 'none',
                  }}
                  onPointerDown={r.interactive && !disabled ? startDrag(r.key) : undefined}
                />
              )}
              {r.dotClass && (
                <circle
                  className={`dot ${r.dotClass}`}
                  r="6"
                  cx={cx + r.radius * Math.cos(a)}
                  cy={cy + r.radius * Math.sin(a)}
                  style={{ pointerEvents: pointer, touchAction: 'none' }}
                  onPointerDown={r.interactive && !disabled ? startDrag(r.key) : undefined}
                />
              )}
            </g>
          );
        })}

        {showNumbers && (
          <g className="dial-numbers" style={{ pointerEvents: 'none' }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const val = (i + 1) * 5;
              const a = (val / 60) * TAU - Math.PI / 2;
              const rNum = Math.min(outerRadius - 26, outerRadius * 0.76);
              const x = cx + rNum * Math.cos(a);
              const y = cy + rNum * Math.sin(a) + 5;
              return (
                <text key={val} x={x} y={y}>
                  {val === 60 ? '60' : val}
                </text>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
