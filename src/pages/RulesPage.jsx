export default function RulesPage({ setPage }) {
  const hour = new Date().getHours();
  const backgroundClass = hour >= 18 ? "evening-bg" : "day-bg";

  return (
    <main className={`dc-home ${backgroundClass}`}>
      <section className="dc-rules-card">
        <h1>challenge rules</h1>

        <ol>
          <li>you must upload a photograph with each post</li>
          <li>hi bb can you post more captions</li>
          <li>no need poems if no time</li>
        </ol>

        <p>complete the challenge to unlock a reward!</p>

        <button className="dc-enter-button" onClick={() => setPage("daily")}>
          begin →
        </button>
      </section>
    </main>
  );
}