import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/momentPage.css";

export default function MomentPage({ setPage }) {
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    async function fetchMoments() {
      const twentyFourHoursAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();

      const { data, error } = await supabase
        .from("daily_entries")
        .select("*")
        .gte("created_at", twentyFourHoursAgo)
        .order("created_at", { ascending: false });

        console.log("Supabase data:", data);
console.log("Supabase error:", error);
console.log("24h cutoff:", twentyFourHoursAgo);

      if (error) {
        console.error("Error fetching moments:", error);
        return;
      }

      setMoments(data);
    }

    fetchMoments();
  }, []);

  return (
    <main className="moment-page">
      <header className="moment-page-header">
        <button
          className="moment-page-back-button"
          onClick={() => setPage("rules")}
        >
          back
        </button>

        <h1 className="moment-page-title">moments</h1>
        <p className="moment-page-subtitle">posted in the last 24 hours</p>
      </header>

      <section className="moment-page-feed">
        {moments.length === 0 ? (
          <p className="moment-page-empty">
            no moments from the past 24 hours yet
          </p>
        ) : (
          moments.map((moment) => (
            <article className="moment-page-card" key={moment.id}>
              <img
                className="moment-page-photo"
                src={moment.image_url}
                alt={moment.description || "moment"}
              />

              <div className="moment-page-caption-box">
                <p className="moment-page-caption">{moment.description}</p>
                <p className="moment-page-poem">{moment.poem}</p>
                <p className="moment-page-mood">{moment.mood}</p>
                
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}