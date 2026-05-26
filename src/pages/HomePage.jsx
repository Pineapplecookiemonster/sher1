import { useEffect, useState } from 'react';

function getTimeUntil2200() {
  const now = new Date();

  const today2200 = new Date();
  today2200.setHours(22, 0, 0, 0);

  const tomorrow0600 = new Date();
  tomorrow0600.setDate(tomorrow0600.getDate() + 1);
  tomorrow0600.setHours(6, 0, 0, 0);

  // Between 22:00 and 06:00
  if (now >= today2200 || now.getHours() < 6) {
    return "time’s up!";
  }

  const diff = today2200 - now;

  const hours = String(
    Math.floor(diff / 1000 / 60 / 60)
  ).padStart(2, "0");

  const minutes = String(
    Math.floor((diff / 1000 / 60) % 60)
  ).padStart(2, "0");

  const seconds = String(
    Math.floor((diff / 1000) % 60)
  ).padStart(2, "0");

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

        <section className="dc-orbit-card">
      <p className="dc-small-text">
        {timeLeft === "time’s up!"
          ? "challenge complete"
          : "challenge ends in"}
      </p>

        <div className="dc-countdown-circle">
          <span className="dc-countdown">{timeLeft}</span>
        </div>

        <p className="dc-tagline">wooohoo!</p>

{timeLeft === "time’s up!" ? (
  <button
    className="dc-enter-button"
    onClick={() => setPage("rewards")}
  >
    claim reward →
  </button>
) : (
  <button
    className="dc-enter-button"
    onClick={() => setPage("rules")}
  >
    enter →
  </button>
)}
        </section>
    </main>
  );
}


