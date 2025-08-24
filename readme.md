# ⏱️ React Timer App

<p align="center">
  <a href="https://timer-app-dztp.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/View%20Project-Click%20Here-blue?style=for-the-badge" alt="View Project">
  </a>
</p>

---

## 🖼️ Screenshot

<div align="center">
  <img src="https://github.com/Denis793/Timer/blob/main/src/assets/img/screens/screen-1.png" alt="View click" height="auto" width="47%">
  <img src="https://github.com/Denis793/Timer/blob/main/src/assets/img/screens/screen-2.png" alt="View click" height="auto" width="47%">
</div>

---

## ✨ Features

- **Two modes**
  - **Stopwatch** (count up) — animated dial for hours, minutes, seconds.
  - **Timer** (count down) — same dial, but time is set by dragging ring dots.
- **Unified circular dial**
  - Outer ring = **hours**, middle ring = **minutes**, inner ring = **seconds**.
  - Drag dots to set time in Timer; rings are read-only in Stopwatch.
- **Controls**
  - Stopwatch: **Reset**, **Play/Pause**, **Save**.
  - Timer: **Reset**, **Play/Pause** (Play button is centered when there are only two buttons).
- **Saved Times (Stopwatch only)**
  - Save current time; rename inline; delete one or **Clear all**.
  - Deleting is blocked while the stopwatch is running.
  - Persisted in `localStorage`.
- **Audio alert** when Timer finishes (`assets/alarm.mp3`).
- **PNG icons** for controls (reset/play/pause/flag).
- **Accessibility**
  - Buttons have `aria-label`s; rename supports `Enter` (save) and `Escape` (cancel).

---

## 🚀 Technologies

- React
- Vite
- CSS Modules / Tailwind (optional)
- JavaScript (ES6+)
- React Hooks (useState, useEffect, useRef)

- **React** + **Vite**
- **Custom hooks**
  - `useStopwatch` — high‑precision counting with pause/reset.
  - `useCountdown` — countdown via `requestAnimationFrame` + refs to avoid stale closures.
- **SVG rendering**
  - One generic `Dial` component does angles, dash progress, ticks, and numbers.
- **SCSS**
  - Co-located styles per component (e.g., `Dial/Dial.scss`) + a small shared `styles/_common.scss` for tokens/card/utility.

---

## 🚀 Getting started

### 1) Install

```bash
npm i
```

### 2) Run

```bash
npm run dev
```

### 3) Build

```bash
npm run build
npm run preview
```

---

## 🧩 Components (overview)

- **Dial** (generic)
  - Props: `size`, `ticks`, `showNumbers`, `rings[]`, `disabled`, `onRingChange(key, val)`
  - Each ring: `{ key, radius, value, max, baseClass, progClass, dotClass, interactive }`
  - Converts pointer → angle → value; draws base ring, progress (dasharray), and draggable dot.
- **CircularDial**
  - Read-only dial used by **Stopwatch**; passes live `hours/minutes/seconds` values.
- **TimeSetterDial**
  - Interactive dial used by **Timer**; blocked while counting down; receives current remaining values for live display.
- **CircleButton / ControlsRow**
  - Shared controls UI. `ControlsRow` auto-centers the middle button when there are only two children (Timer).
- **Stopwatch**
  - Uses `useStopwatch`; supports save/rename/delete; persists to `localStorage`.
- **Countdown**
  - Uses `useCountdown`; plays `alarm.mp3` at the end; start with `start(totalMs)`; pause/resume via `toggle()`.

---

## 🧠 Hooks

### `useStopwatch`

- State: `isRunning`, `elapsedTime`
- API: `toggle()`, `reset()`
- Derived: `timeFormatted`, `hoursValue`, `minutesValue`, `secondsValue`

### `useCountdown`

- State: `timeLeft`, `isRunning`, `isFinished`
- Refs: `isRunningRef`, `endAtRef`, `lastLeftRef` (no stale state in RAF loop)
- API: `start(ms)`, `toggle()`, `reset()`, `setNewTime(ms)`
- Derived: `timeFormatted`, `timeLeftMs`, `minutes`, `seconds`, `centiseconds`

---

## 💾 Saved Times (Stopwatch)

- Stored in `localStorage` under the `savedTimes` key.
- Each record: `{ id, mode: 'stopwatch', time: 'MM:SS:CS', label }`.
- Editing: click the label → type → **Enter** saves, **Esc** cancels.
- Deleting: single entry (✕) or **Clear all**.
- While the stopwatch is running, deletion/clear is disabled.

---

## 📝 License

**MIT** — feel free to use, modify, and distribute. See `LICENSE` (or change to your preferred license).

---
