import { useEffect, useState } from "react";
import "../styles/JokeLanding.css";

const START_HOUR = 0; // 8pm
const COOLDOWN_MINUTES = 150;
// resetJokeStories()
function getTodayStartTime() {
  const start = new Date();
  start.setHours(START_HOUR, 0, 0, 0);
  return start;
}

function getUnlockTime() {
  const lastReadAt = localStorage.getItem("jokeLastReadAt");

  if (!lastReadAt) {
    return new Date(); // available immediately
  }

  return new Date(
    Number(lastReadAt) + COOLDOWN_MINUTES * 60 * 1000
  );
}

function formatTimeLeft(ms) {
  if (ms <= 0) return "ready";

  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

      window.resetJokes = function () {
      localStorage.removeItem("jokeStoryIndex");
      localStorage.removeItem("jokeLastReadAt");
      location.reload();
    };



    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="joke-landing-page">
      <div className="joke-landing-content">
        <p className="joke-landing-label">next poem in</p>

        <h1 className="joke-landing-timer">
          {isUnlocked ? "ready" : timeLeft}
        </h1>

        <p className="joke-landing-subtitle">
          {isUnlocked
            ? "literary works await"
            : "stay tuned!"}
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
              <button className="home-button-landing" onClick={() => setPage("sherapp")}>
                Return home
              </button>
            )}

    </div>
  );
}