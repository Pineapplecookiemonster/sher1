import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/JosephAdmin.css";

const RANDOM_JOSEPH_VIBES = [
  "quiet chaos",
  "rounding",
  "skydiver 123",
  "main character",
  "low battery",
  "no indomie left",
  "in the toilet",
  "chagee feeling",
  "soft menace",
  "admin goblin",
];

export default function JosephAdmin({ setPage }) {
  const [josephVibe, setJosephVibe] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadJosephVibe() {
      const { data, error } = await supabase
        .from("sher_app_vibes")
        .select("vibe")
        .eq("person", "joseph")
        .single();

      if (error) {
        console.error("Error loading Joseph vibe:", error);
        setStatus("error");
        return;
      }

      setJosephVibe(data?.vibe || "");
      setStatus("ready");
    }

    loadJosephVibe();
  }, []);

  async function saveJosephVibe(event) {
    event.preventDefault();

    const cleanedVibe = josephVibe.trim();

    if (!cleanedVibe) return;

    setStatus("saving");

    const { error } = await supabase
      .from("sher_app_vibes")
      .upsert(
        {
          person: "joseph",
          vibe: cleanedVibe,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "person" }
      );

    if (error) {
      console.error("Error saving Joseph vibe:", error);
      setStatus("error");
      return;
    }

    setStatus("saved");

    setTimeout(() => {
      setStatus("ready");
    }, 1500);
  }

  function randomiseJosephVibe() {
    const randomIndex = Math.floor(Math.random() * RANDOM_JOSEPH_VIBES.length);
    setJosephVibe(RANDOM_JOSEPH_VIBES[randomIndex]);
  }

  return (
    <main className="joseph-admin-page">
      <div className="joseph-admin-shell">
        <header className="joseph-admin-header">
          <button
            type="button"
            className="admin-back-button"
            onClick={() => setPage("sherapp")}
          >
            Back
          </button>

          <div>
            <p className="admin-kicker">control panel</p>
            <h1>Joseph Admin</h1>
          </div>
        </header>

        <section className="admin-section">
          <div className="admin-section-heading">
            <h2>Joseph vibe</h2>
            <p>This updates the Joseph vibe shown on Sher App.</p>
          </div>

          <form onSubmit={saveJosephVibe} className="admin-form">
            <label htmlFor="joseph-vibe-input">Current vibe</label>

            <input
              id="joseph-vibe-input"
              value={josephVibe}
              onChange={(event) => setJosephVibe(event.target.value)}
              maxLength={40}
              placeholder="type joseph vibe..."
            />

            <div className="admin-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={randomiseJosephVibe}
              >
                Random
              </button>

              <button type="submit" className="admin-primary-button">
                Save vibe
              </button>
            </div>
          </form>

          <p className={`admin-status ${status}`}>
            {status === "loading" && "Loading..."}
            {status === "ready" && "Ready"}
            {status === "saving" && "Saving..."}
            {status === "saved" && "Saved"}
            {status === "error" && "Something went wrong"}
          </p>
        </section>

        <section className="admin-section disabled">
          <div className="admin-section-heading">
            <h2>Future controls</h2>
            <p>Notifications, poetry controls, calendar, and feature toggles can go here later.</p>
          </div>
        </section>
      </div>
    </main>
  );
}