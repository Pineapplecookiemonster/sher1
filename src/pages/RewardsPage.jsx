import { useState } from "react";

export default function ChoicePage() {
 //const hour = new Date().getHours();
 //const backgroundClass = hour >= 18 ? "evening-bg" : "day-bg";

  const savedChoice = localStorage.getItem("dailyChoice");
  const [choice, setChoice] = useState(savedChoice);

function chooseOption(option, url) {
  if (choice) return;

  localStorage.setItem("dailyChoice", option);
  setChoice(option);

  window.location.href = url;
}

function resetChoice() {
  localStorage.removeItem("dailyChoice");
  setChoice(null);
}



return (
<main
  className="dc-home"
  style={{
    backgroundImage: `url("https://images.unsplash.com/photo-1499678329028-101435549a4e")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
    <section className="dc-rules-card">
      <h1>Challenge Complete</h1>

<p style={{ marginBottom: "6px" }}>
  Thank you for your participation babey ❤️ Your responses have been saved 🥰
</p>

<p style={{ marginTop: "0px" }}>
  Click below to claim your reward!
</p>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "40px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "0.95rem",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          Choose wisely — you only get to choose once :(
        </p>

        <button
          onClick={() =>
            chooseOption("A", "https://www.youtube.com/watch?v=eVu42-x6_wY")
          }
          disabled={!!choice && choice !== "A"}
          style={{
            width: "160px",
            padding: "18px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            color: "white",
            fontSize: "0.7rem",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            opacity: !!choice && choice !== "A" ? 0.35 : 1,
            transition: "all 0.3s ease",
          }}
        >
          Pineapple Video A
        </button>

        <button
          onClick={() =>
            chooseOption("B", "https://www.youtube.com/watch?v=eVu42-x6_wY")
          }
          disabled={!!choice && choice !== "B"}
          style={{
            width: "160px",
            padding: "18px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            color: "white",
            fontSize: "0.7rem",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            opacity: !!choice && choice !== "B" ? 0.35 : 1,
            transition: "all 0.3s ease",
          }}
        >
          Pineapple Video B
        </button>
        {choice && (
  <p
    style={{
      marginTop: "18px",
      color: "rgba(255,255,255,0.72)",
      fontSize: "0.92rem",
      letterSpacing: "0.03em",
      textAlign: "center",
    }}
  >
    You have already selected your reward HEHEHE
  </p>
)}
      </div>
    </section>
  </main>
);
}