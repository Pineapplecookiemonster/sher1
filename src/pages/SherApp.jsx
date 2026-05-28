import { useEffect, useMemo, useState } from "react";
import "../styles/SherApp.css";

const SHER_TIME_ZONE = "Asia/Singapore";

function getSherTimeInfo(date) {
  const rawHour = new Intl.DateTimeFormat("en-GB", {
    timeZone: SHER_TIME_ZONE,
    hour: "2-digit",
    hour12: false,
  }).format(date);

  const hour = Number(rawHour) % 24;

  const timeText = new Intl.DateTimeFormat("en-GB", {
    timeZone: SHER_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .toLowerCase();

  const dateText = new Intl.DateTimeFormat("en-GB", {
    timeZone: SHER_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(date);

  const dateKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: SHER_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return {
    hour,
    timeText,
    dateText,
    dateKey,
  };
}

function getGreeting(hour) {
  if (hour < 6) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getDailyJosephVibe(dateKey) {
  const josephVibes = [
    "rounding",
    "skydiver 123",
    "main character",
    "low battery",
    "no indomie left",
    "in the toilet",
    "chagee feeling",
  ];

  const seed = dateKey
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  return josephVibes[seed % josephVibes.length];
}

function TimeGraphic({ isNight }) {
  if (isNight) {
    return (
      <svg
        className="time-graphic-svg"
        viewBox="0 0 420 270"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nightSky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#252a4a" />
            <stop offset="100%" stopColor="#15182c" />
          </linearGradient>

          <linearGradient id="nightHill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#4f5875" />
            <stop offset="100%" stopColor="#2e3553" />
          </linearGradient>
        </defs>

        <rect width="420" height="270" fill="url(#nightSky)" />

        <circle cx="318" cy="58" r="34" fill="#f6eed2" />
        <circle cx="331" cy="50" r="34" fill="#252a4a" />

        <circle cx="78" cy="52" r="2.4" fill="#fff4d1" opacity="0.8" />
        <circle cx="132" cy="82" r="1.8" fill="#fff4d1" opacity="0.65" />
        <circle cx="198" cy="44" r="2.1" fill="#fff4d1" opacity="0.7" />
        <circle cx="362" cy="104" r="1.7" fill="#fff4d1" opacity="0.65" />
        <circle cx="290" cy="126" r="1.9" fill="#fff4d1" opacity="0.55" />

        <path
          d="M0 180C55 150 98 151 147 180C194 208 245 210 296 177C347 145 382 150 420 172V270H0Z"
          fill="url(#nightHill)"
          opacity="0.82"
        />

        <path
          d="M0 215C66 190 131 190 195 215C260 240 344 238 420 205V270H0Z"
          fill="#202744"
          opacity="0.92"
        />
      </svg>
    );
  }

  return (
    <svg
      className="time-graphic-svg"
      viewBox="0 0 420 270"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="daySky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff0bd" />
          <stop offset="100%" stopColor="#f7dba4" />
        </linearGradient>

        <linearGradient id="dayHill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c9d7a0" />
          <stop offset="100%" stopColor="#91aa77" />
        </linearGradient>
      </defs>

      <rect width="420" height="270" fill="url(#daySky)" />

      <circle cx="315" cy="68" r="42" fill="#ffd36a" />

      <path
        d="M86 78C92 62 107 55 121 61C130 42 157 41 168 61C184 57 201 68 203 84C206 105 184 116 162 108H102C78 112 68 92 86 78Z"
        fill="#fff8df"
        opacity="0.82"
      />

      <path
        d="M0 178C58 146 111 151 157 181C203 212 251 207 299 176C346 146 383 149 420 171V270H0Z"
        fill="url(#dayHill)"
        opacity="0.85"
      />

      <path
        d="M0 216C72 189 131 191 195 216C259 240 344 238 420 205V270H0Z"
        fill="#758e63"
        opacity="0.38"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="13" height="12" rx="3" />
      <path d="M17 10l4-2v8l-4-2z" />
    </svg>
  );
}

function IconJournal() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V5a1 1 0 0 1 1-1z" />
      <path d="M8 4v16" />
      <path d="M11 9h5" />
      <path d="M11 13h4" />
    </svg>
  );
}

function IconStories() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H20v15H8.5A3.5 3.5 0 0 0 5 20.5z" />
      <path d="M5 5.5v15" />
      <path d="M9 7h7" />
      <path d="M9 11h5" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19h4l10-10a2.8 2.8 0 0 0-4-4L5 15z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

export default function SherApp({ setPage, josephVibeFromAdmin }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sherVibe, setSherVibe] = useState("hornz");
  const [draftVibe, setDraftVibe] = useState("slow morning");
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [showVibeEditor, setShowVibeEditor] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const sherTime = useMemo(() => {
    return getSherTimeInfo(currentTime);
  }, [currentTime]);

  const isNight = sherTime.hour >= 18 || sherTime.hour < 6;
  const greeting = getGreeting(sherTime.hour);

  const josephVibe =
    josephVibeFromAdmin || getDailyJosephVibe(sherTime.dateKey);

  function handleUnavailableClick() {
    setShowUnavailable(true);
  }

  function openVibeEditor() {
    setDraftVibe(sherVibe);
    setShowVibeEditor(true);
  }

  function saveSherVibe(event) {
    event.preventDefault();

    const cleanedVibe = draftVibe.trim();

    if (!cleanedVibe) return;

    setSherVibe(cleanedVibe);
    setShowVibeEditor(false);
  }

  return (
    <main className={`sher-app-page ${isNight ? "night" : "day"}`}>
      <div className="sher-app-shell">
        <header className="sher-app-header">
          <h1 className="sher-app-title">sher app ™</h1>
        </header>

        <section className="sher-hero-card">
          <div className="sher-hero-copy">
            <h2 className="sher-app-greeting">{greeting}, Sher</h2>
            <p className="sher-app-time">
              {sherTime.dateText} · {sherTime.timeText}
            </p>
          </div>

          <div className="time-graphic-card">
            <TimeGraphic isNight={isNight} />

            <div className="vibe-panel">
              <div className="vibe-card">
                <span className="vibe-label">sher&apos;s vibe</span>
                <strong className="vibe-text">{sherVibe}</strong>
              </div>

              <div className="vibe-card">
                <span className="vibe-label">joseph&apos;s vibe</span>
                <strong className="vibe-text">{josephVibe}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="sher-app-grid" aria-label="Sher app pages">
          <button onClick={handleUnavailableClick} className="sher-app-card">
            <span className="card-icon">
              <IconCalendar />
            </span>
            <span className="card-label">Calendar</span>
          </button>

          <button onClick={handleUnavailableClick} className="sher-app-card">
            <span className="card-icon">
              <IconVideo />
            </span>
            <span className="card-label">Videos</span>
          </button>

          <button onClick={() => setPage("rules")} className="sher-app-card">
            <span className="card-icon">
              <IconJournal />
            </span>
            <span className="card-label">Journal</span>
          </button>

          {/* <button onClick={() => setPage("jokelanding")} className="sher-app-card"> */}
            <button onClick={handleUnavailableClick} className="sher-app-card">
            <span className="card-icon">
              <IconStories />
            </span>
            <span className="card-label">Stories</span>
          </button>
        </section>

        <footer className="sher-app-footer">
          <button className="set-vibe-button" onClick={openVibeEditor}>
            <span className="set-vibe-icon">
              <IconEdit />
            </span>
            <span>Set my vibe</span>
          </button>
        </footer>
      </div>

      {showUnavailable && (
        <div
          className="modal-backdrop"
          onClick={() => setShowUnavailable(false)}
        >
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <p>coming soon!</p>

            <button
              type="button"
              className="modal-primary"
              onClick={() => setShowUnavailable(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showVibeEditor && (
        <div
          className="modal-backdrop"
          onClick={() => setShowVibeEditor(false)}
        >
          <form
            className="modal-card vibe-editor-card"
            onSubmit={saveSherVibe}
            onClick={(event) => event.stopPropagation()}
          >
            <label className="vibe-editor-title" htmlFor="sher-vibe-input">
              Set Sher&apos;s vibe
            </label>

            <input
              id="sher-vibe-input"
              className="vibe-editor-input"
              value={draftVibe}
              onChange={(event) => setDraftVibe(event.target.value)}
              maxLength={40}
              autoFocus
            />

            <div className="modal-actions">
              <button
                type="button"
                className="modal-secondary"
                onClick={() => setShowVibeEditor(false)}
              >
                Cancel
              </button>

              <button type="submit" className="modal-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}