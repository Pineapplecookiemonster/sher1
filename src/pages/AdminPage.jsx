import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/adminpage.css";

export default function AdminPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      const { data, error } = await supabase
        .from("daily_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setEntries(data || []);
      }
    }

    loadEntries();
  }, []);

  return (
    <main className="admin-page">
      <h1>daily entries</h1>

      <div className="admin-grid">
        {entries.map((entry) => (
          <article className="admin-card" key={entry.id}>
            <img src={entry.image_url} alt="" />

            <p>{entry.mood}</p>
            <p>{entry.description}</p>
            <p>{entry.poem}</p>

            <small>
              {new Date(entry.created_at).toLocaleString()}
            </small>
          </article>
        ))}
      </div>
    </main>
  );
}