import { useEffect, useState } from 'react';

function getTimeUntil2200() {
  const now = new Date();
  const target = new Date();

  target.setHours(22, 0, 0, 0);

  if (now > target) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target - now;

  const hours = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, '0');
  const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

  if (diff <= 0) {
    return "time’s up!";
  }

  return `${hours}:${minutes}:${seconds}`;
}

export default function HomePage({ setPage }) {
  const hour = new Date().getHours();
  const backgroundClass = hour >= 18 ? 'evening-bg' : 'day-bg';

  const [timeLeft, setTimeLeft] = useState(getTimeUntil2200());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntil2200());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className={`dc-home ${backgroundClass}`}>
      <div className="dc-orb-glow" />

      <p className="dc-small-text">
        {timeLeft === "time’s up!"
          ? "challenge complete"
          : "challenge ends in"}
      </p>

        <div className="dc-countdown-circle">
          <span className="dc-countdown">{timeLeft}</span>
        </div>

        <p className="dc-tagline">keep it up!</p>

        <button className="dc-enter-button" onClick={() => setPage('rules')}>
          enter →
        </button>
      </section>
    </main>
  );
}
