import { useState, useEffect, useRef } from 'react'
import './index.css'
const TASKS = [
  {
    id: 'kitchen',
    zone: 'Kitchen',
    emoji: '🍽️',
    minutes: 15,
    items: [
      { id: 'k1', text: 'Clear and wipe down counters' },
      { id: 'k2', text: 'Load dishwasher or wash dishes by hand' },
      { id: 'k3', text: 'Wipe stovetop and microwave' },
      { id: 'k4', text: 'Empty trash if full' },
      { id: 'k5', text: 'Sweep or quick-mop the floor' },
    ],
  },
  {
    id: 'living',
    zone: 'Living Room',
    emoji: '🛋️',
    minutes: 10,
    items: [
      { id: 'l1', text: 'Pick up clutter and put items away' },
      { id: 'l2', text: 'Fluff and straighten couch cushions' },
      { id: 'l3', text: 'Wipe down coffee table and surfaces' },
      { id: 'l4', text: 'Quick vacuum or sweep' },
    ],
  },
  {
    id: 'bathroom',
    zone: 'Bathroom',
    emoji: '🚿',
    minutes: 10,
    items: [
      { id: 'b1', text: 'Wipe sink, faucet, and counter' },
      { id: 'b2', text: 'Wipe toilet seat and handle' },
      { id: 'b3', text: 'Spray and wipe mirror' },
      { id: 'b4', text: 'Replace hand towel with a fresh one' },
      { id: 'b5', text: 'Sweep floor' },
    ],
  },
  {
    id: 'bedroom',
    zone: 'Bedroom',
    emoji: '🛏️',
    minutes: 10,
    items: [
      { id: 'bd1', text: 'Make the bed' },
      { id: 'bd2', text: 'Put away clothes or toss in hamper' },
      { id: 'bd3', text: 'Clear nightstands' },
      { id: 'bd4', text: 'Quick floor sweep or vacuum' },
    ],
  },
  {
    id: 'entry',
    zone: 'Entryway & Final Touches',
    emoji: '✨',
    minutes: 15,
    items: [
      { id: 'e1', text: 'Tidy shoes and bags at the door' },
      { id: 'e2', text: 'Wipe down front door handle' },
      { id: 'e3', text: 'Light a candle or spray a room mist' },
      { id: 'e4', text: 'Do a final walkthrough — you did it!' },
    ],
  },
]

const ALL_ITEMS = TASKS.flatMap(t => t.items)
const TOTAL_SECONDS = 60 * 60

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function Confetti() {
  const colors = ['#c9a96e', '#f0e6d3', '#2c2c2c', '#e8d5b7', '#fff']
  const pieces = Array.from({ length: 40 })
  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [checked, setChecked] = useState({})
  const [timerActive, setTimerActive] = useState(false)
  const [seconds, setSeconds] = useState(TOTAL_SECONDS)
  const [started, setStarted] = useState(false)
  const [dishwasherMode, setDishwasherMode] = useState(true)
  const intervalRef = useRef(null)

  const completedCount = ALL_ITEMS.filter(i => checked[i.id]).length
  const totalCount = ALL_ITEMS.length
  const progress = Math.round((completedCount / totalCount) * 100)
  const allDone = completedCount === totalCount

  useEffect(() => {
    if (timerActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [timerActive, seconds])

  const handleCheck = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleStart = () => {
    setStarted(true)
    setTimerActive(true)
  }

  const handleReset = () => {
    setChecked({})
    setSeconds(TOTAL_SECONDS)
    setTimerActive(false)
    setStarted(false)
  }

  const getTaskProgress = (task) => {
    const done = task.items.filter(i => checked[i.id]).length
    return { done, total: task.items.length }
  }

  return (
    <div className="app">
      {allDone && <Confetti />}

      {/* Header */}
      <header className="header">
        <div className="header-badge">Spoiled Homes Cleaning Service LLC</div>
        <h1 className="header-title">60-Minute Home Reset</h1>
        <p className="header-sub">A guided reset for busy moms who need a fresh start — fast.</p>
      </header>

      {/* Timer Card */}
      <div className="timer-card">
        <div className={`timer-display ${seconds < 300 && started ? 'timer-urgent' : ''}`}>
          {formatTime(seconds)}
        </div>
        <div className="timer-label">
          {!started ? 'Ready when you are' : timerActive ? 'Reset in progress ✨' : 'Timer paused'}
        </div>
        <div className="timer-buttons">
          {!started ? (
             <div>
  <button>
    Start My Reset
  </button>

  <a href="https://linktr.ee/popbyriaAZ" target="_blank">
  <button>Book Your Cleaning Today</button>
</a>
</div>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setTimerActive(a => !a)}
              >
                {timerActive ? 'Pause' : 'Resume'}
              </button>
              <button className="btn btn-ghost" onClick={handleReset}>
                Start Over
              </button>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Your Progress</span>
          <span className="progress-count">{completedCount} of {totalCount} tasks</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-pct">{progress}% complete</div>
      </div>

      {/* Dishwasher Toggle */}
      <div className="toggle-row">
        <span className="toggle-label">Dishes preference:</span>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${dishwasherMode ? 'active' : ''}`}
            onClick={() => setDishwasherMode(true)}
          >
            🍽️ Dishwasher
          </button>
          <button
            className={`toggle-btn ${!dishwasherMode ? 'active' : ''}`}
            onClick={() => setDishwasherMode(false)}
          >
            🫧 Hand Wash
          </button>
        </div>
      </div>

      {/* Task Zones */}
      <div className="zones">
        {TASKS.map(task => {
          const { done, total } = getTaskProgress(task)
          const zoneDone = done === total
          return (
            <div key={task.id} className={`zone-card ${zoneDone ? 'zone-done' : ''}`}>
              <div className="zone-header">
                <div className="zone-title">
                  <span className="zone-emoji">{task.emoji}</span>
                  <span>{task.zone}</span>
                </div>
                <div className="zone-meta">
                  <span className="zone-time">{task.minutes} min</span>
                  <span className="zone-progress">{done}/{total}</span>
                </div>
              </div>
              <ul className="task-list">
                {task.items.map(item => {
                  if (task.id === 'kitchen' && item.id === 'k2') {
                    return (
                      <li key={item.id} className={`task-item ${checked[item.id] ? 'task-checked' : ''}`}>
                        <button
                          className="task-checkbox"
                          onClick={() => handleCheck(item.id)}
                          aria-label={item.text}
                        >
                          {checked[item.id] ? '✓' : ''}
                        </button>
                        <span className="task-text">
                          {dishwasherMode ? 'Load dishwasher and run it' : 'Wash dishes by hand and dry'}
                        </span>
                      </li>
                    )
                  }
                  return (
                    <li key={item.id} className={`task-item ${checked[item.id] ? 'task-checked' : ''}`}>
                      <button
                        className="task-checkbox"
                        onClick={() => handleCheck(item.id)}
                        aria-label={item.text}
                      >
                        {checked[item.id] ? '✓' : ''}
                      </button>
                      <span className="task-text">{item.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Completion Message */}
      {allDone && (
        <div className="completion-card">
          <div className="completion-emoji">🏆</div>
          <h2 className="completion-title">You did it, mama!</h2>
          <p className="completion-sub">
            Your home is reset and YOU showed up for yourself today. That's what being spoiled looks like. 🖤
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-eyebrow">Need a little more help?</div>
        <h2 className="cta-title">Let Spoiled Homes handle it for you.</h2>
        <p className="cta-body">
          Whether you need a quick reset, a deep clean, a move-in/move-out clean,
          or a recurring service — we've got you covered. You deserve a home
          that feels good without doing it all yourself.
        </p>
        <div className="cta-buttons">
          <a
            href="https://www.spoiledhomescleaningservice.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-large"
          >
            Book My Cleaning
          </a>
          <a href="tel:6024564157" className="btn btn-outline btn-large">
            📞 Call Us: 602-456-4157
          </a>
        </div>
        <div className="cta-services">
          <span>✔ Standard Clean</span>
          <span>✔ Deep Clean</span>
          <span>✔ Move-In/Out</span>
          <span>✔ Recurring Service</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">Spoiled Homes Cleaning Service LLC</div>
        <div className="footer-links">
          <a href="https://www.spoiledhomescleaningservice.com" target="_blank" rel="noopener noreferrer">
            www.spoiledhomescleaningservice.com
          </a>
          <span>·</span>
          <a href="tel:6024564157">602-456-4157</a>
        </div>
        <div className="footer-copy">© 2025 Spoiled Homes Cleaning Service LLC · Phoenix, AZ</div>
      </footer>
    </div>
  )
}
