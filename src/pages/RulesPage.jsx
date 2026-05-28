import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RulesPage({ setPage }) {
  const [todayCount, setTodayCount] = useState(0);

  const hour = new Date().getHours();
  const backgroundClass = hour >= 18 ? "evening-bg" : "day-bg";

  useEffect(() => {
    async function getTodayCount() {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const { count, error } = await supabase
        .from("daily_entries")
        .select("*", { count: "exact", head: true })
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (!error) {
        setTodayCount(count || 0);
      }
    }

    getTodayCount();
  }, []);

  return (
    <main className={`dc-home ${backgroundClass}`}>
      <section className="dc-rules-card">
        <h1>we have:</h1>

        <p className="dc-progress-number">{todayCount}</p>

        <p>moments posted today</p>

        <div className="dc-rules-actions">
          <button
            className="dc-enter-button"
            onClick={() => setPage("daily")}
          >
            post →
          </button>

          <button
            className="dc-secondary-button"
            onClick={() => setPage("moment")}
          >
            view moments
          </button>
        </div>
      </section>
    </main>
  );
}