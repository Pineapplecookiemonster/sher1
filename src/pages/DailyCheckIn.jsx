import { useState } from "react";
import { supabase } from "../lib/supabaseClient";


export default function DailyCheckIn() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [poem, setPoem] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const moods = ["🌞", "🏕️", "🍷", "❄️", "🥱"];

function withTimeout(promise, ms = 30000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("upload timed out, please try again")), ms)
    ),
  ]);
}

async function handleSubmit(e) {
  e.preventDefault();

  if (!image) {
    setMessage("please upload a photograph bb");
    return;
  }

  setLoading(true);
  setMessage("");
  setMessage("E10_STARTED: preparing upload");

  try {
      setMessage(
    `E11_FILE_SELECTED: ${image.name}, ${Math.round(
      image.size / 1024 / 1024
    )}MB, ${image.type}`
  );
    const cleanName = image.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, "-");

    const filePath = `entries/${Date.now()}-${crypto.randomUUID()}-${cleanName}`;
    setMessage("E12_UPLOAD_STARTED");
    const { error: uploadError } = await withTimeout(
      supabase.storage
        .from("daily-uploads")
        .upload(filePath, image),
      30000
    );

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from("daily-uploads")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;
    setMessage("E13_UPLOAD_DONE");
    setMessage("E14_DATABASE_STARTED");
    const { error: insertError } = await withTimeout(
      supabase
        .from("daily_entries")
        .insert([
          {
            image_url: imageUrl,
            description,
            poem,
            mood,
          },
        ]),
      15000
    );

    if (insertError) {
      throw insertError;
    }

    setMessage("saved successfully wooo");
    setDescription("");
    setPoem("");
    setMood("");
    setImage(null);
  } catch (error) {
    setMessage(error.message || "save failed, please try again");
  } finally {
    setLoading(false);
  }
}

  return (
    <main
      className="dc-home"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1707677445122-2b7fe814efcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
{/* https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */}
      
      <div className="dc-upload-overlay" />

      <section className="dc-upload-card">
        <p className="dc-upload-title">moo moo </p>

        <form onSubmit={handleSubmit} className="dc-upload-form">

          <label className="dc-upload-button">
            {image ? "photo selected ✓" : "+ upload photograph"}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
          </label>

          <div className="dc-mood-pane">
  <p className="dc-mood-title">mood</p>

          <div className="dc-mood-row">
            {moods.map((item) => (
              <button
                key={item}
                type="button"
                className={`dc-mood-button ${mood === item ? "selected" : ""}`}
                onClick={() => setMood(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

          <textarea
            className="dc-input"
            placeholder="caption me 😘"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="dc-input dc-poem-box"
            placeholder="random poem"
            value={poem}
            onChange={(e) => setPoem(e.target.value)}
          />

          <button className="dc-submit-button" type="submit">
            {loading ? "saving..." : "submit →"}
          </button>

          <p className="dc-message">{message}</p>
        </form>
      </section>
    </main>
  );
}