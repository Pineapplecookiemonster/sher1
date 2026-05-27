import { useEffect, useState } from "react";
import "../styles/JokeLanding.css";

const START_HOUR = 0; // 8pm
const COOLDOWN_MINUTES = 10;

function getTodayStartTime() {
  const start = new Date();
  start.setHours(START_HOUR, 0, 0, 0);
  return start;
}

function getUnlockTime() {
  const lastReadAt = localStorage.getItem("jokeLastReadAt");

  if (lastReadAt) {
    return new Date(Number(lastReadAt) + COOLDOWN_MINUTES * 60 * 1000);
  }

  return getTodayStartTime();
}

function formatTimeLeft(ms) {
  if (ms <= 0) return "00:00";

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function JokeLanding({ setPage }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    function updateTimer() {
      const now = new Date();
      const unlockTime = getUnlockTime();
      const diff = unlockTime - now;

      setIsUnlocked(diff <= 0);
      setTimeLeft(formatTimeLeft(diff));
    }

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="joke-landing-page">
      <div className="joke-landing-content">
        <p className="joke-landing-label">next story in</p>

        <h1 className="joke-landing-timer">
          {isUnlocked ? "ready" : timeLeft}
        </h1>

        <p className="joke-landing-subtitle">
          {isUnlocked
            ? "a new ridiculous chapter awaits"
            : "unlocking soon"}
        </p>

        

      </div>

      <button
        className="joke-landing-button"
        disabled={!isUnlocked}
        onClick={() => setPage && setPage("jokes")}
      >
        read story
      </button>

            {setPage && (
              <button className="home-button-landing" onClick={() => setPage("home")}>
                Return home
              </button>
            )}

    </div>
  );
}