import React, { useState } from 'react';
import { Stopwatch } from '../Stopwatch';
import { Countdown } from '../Countdown';
import './TimerApp.scss';

export const TimerApp = () => {
  const [mode, setMode] = useState('stopwatch');
  const [isRunning, setIsRunning] = useState(false);

  const [savedTimes, setSavedTimes] = useState(() => {
    const data = localStorage.getItem('savedTimes');
    return data ? JSON.parse(data) : [];
  });
  const persist = (arr) => localStorage.setItem('savedTimes', JSON.stringify(arr));

  const handleSaveTime = (time) => {
    if (mode !== 'stopwatch') return;
    const item = { id: Date.now(), mode: 'stopwatch', time, label: 'stopwatch' };
    const updated = [...savedTimes, item];
    setSavedTimes(updated);
    persist(updated);
  };

  const clearAll = () => {
    if (isRunning) return;
    setSavedTimes([]);
    localStorage.removeItem('savedTimes');
  };
  const removeOne = (id) => {
    if (isRunning) return;
    const upd = savedTimes.filter((i) => i.id !== id);
    setSavedTimes(upd);
    persist(upd);
  };

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const startRename = (item) => {
    if (isRunning) return;
    setEditingId(item.id);
    setEditValue(item.label ?? '');
  };
  const saveRename = () => {
    if (editingId == null) return;
    const val = editValue.trim();
    if (!val) {
      setEditingId(null);
      setEditValue('');
      return;
    }
    const upd = savedTimes.map((i) => (i.id === editingId ? { ...i, label: val } : i));
    setSavedTimes(upd);
    persist(upd);
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="timer-container">
      <div className="mode-switch">
        <button className={mode === 'stopwatch' ? 'active' : ''} onClick={() => setMode('stopwatch')}>
          Stopwatch
        </button>
        <button className={mode === 'countdown' ? 'active' : ''} onClick={() => setMode('countdown')}>
          Timer
        </button>
      </div>

      <div className="timer-content">
        {mode === 'stopwatch' ? (
          <Stopwatch onSave={handleSaveTime} onRunningChange={setIsRunning} />
        ) : (
          <Countdown onRunningChange={setIsRunning} />
        )}
      </div>

      {mode === 'stopwatch' && (
        <div className="saved-times">
          <div className="saved-head">
            <h3>Saved Times</h3>
            {savedTimes.length > 0 && (
              <button className="clear-all" onClick={clearAll} disabled={isRunning}>
                Clear all
              </button>
            )}
          </div>

          {savedTimes.length === 0 ? (
            <p className="muted">No saved records yet</p>
          ) : (
            <ul>
              {savedTimes.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <li key={item.id}>
                    <div className="record-main">
                      {isEditing ? (
                        <>
                          <input
                            className="edit-input"
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRename();
                              if (e.key === 'Escape') {
                                setEditingId(null);
                                setEditValue('');
                              }
                            }}
                            placeholder="Record name"
                          />
                          <button className="btn small ok" onClick={saveRename}>
                            ✓
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="name editable" onClick={() => startRename(item)} title="Click to rename">
                            {item.label}
                          </span>
                          <span className="val">{item.time}</span>
                        </>
                      )}
                    </div>
                    <div className="row-actions">
                      <button className="remove-one" onClick={() => removeOne(item.id)} disabled={isRunning}>
                        ✕
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
