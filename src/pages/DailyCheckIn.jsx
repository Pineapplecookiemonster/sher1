import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DailyCheckIn() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [poem, setPoem] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      setMessage("oi you never upload photograph. u think i don't know");
      return;
    }

    setLoading(true);

    const filePath = `entries/${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("daily-uploads")
      .upload(filePath, image);

    if (uploadError) {
      setMessage(uploadError.message);
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("daily-uploads")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase
      .from("daily_entries")
      .insert([
        {
          image_url: imageUrl,
          description,
          poem,
        },
      ]);

    if (insertError) {
      setMessage("save failed");
      setLoading(false);
      return;
    }

    setMessage("saved successfully 💌");

    setDescription("");
    setPoem("");
    setImage(null);
    setLoading(false);
  }

  return (
    <main
      className="dc-home"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
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