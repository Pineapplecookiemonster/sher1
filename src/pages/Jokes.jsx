import { useEffect, useState } from "react";
import "../styles/Jokes.css";

const STORAGE_KEY = "jokeStoryIndex";

export default function Jokes({ setPage }) {
  const [stories, setStories] = useState([]);
  const [storyIndex, setStoryIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}joke-stories.txt`)
      .then((res) => res.text())
      .then((text) => {
        const parsedStories = text
          .split("---")
          .map((story) =>
            story
              .trim()
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
          )
          .filter((story) => story.length > 1);

        const savedIndex = Number(localStorage.getItem(STORAGE_KEY) || 0);
        const safeIndex = savedIndex % parsedStories.length;

        setStories(parsedStories);
        setStoryIndex(safeIndex);
      });
  }, []);

  useEffect(() => {
    window.resetJokeStories = function () {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    };
  }, []);

  if (stories.length === 0) {
    return <div className="joke-page">Loading story...</div>;
  }

  const currentStory = stories[storyIndex];
  const isPunchline = step === currentStory.length - 1;

function goNext() {
  setFade(false);

  setTimeout(() => {
    const nextStep = step + 1;

    setStep(nextStep);
    setFade(true);

    if (nextStep === currentStory.length - 1) {
      localStorage.setItem("jokeLastReadAt", String(Date.now()));
    }
  }, 220);
}
  function rateStory(star) {
    setRating(star);

    const nextIndex = (storyIndex + 1) % stories.length;
    localStorage.setItem(STORAGE_KEY, String(nextIndex));
    localStorage.setItem("jokeLastReadAt", String(Date.now()));
    
  }

  return (
    <div className="joke-page">


      <div className="joke-card">
        <div className={fade ? "joke-text fade-in" : "joke-text fade-out"}>
          {currentStory[step]}
        </div>

        

        {!isPunchline ? (
          <button className="joke-next" onClick={goNext}>
            →
          </button>
        ) : (
                <div className="rating-area">
        <p className="rating-label">rate this masterpiece</p>

        <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => rateStory(star)}
            >
                ★
            </button>
            ))}
            </div>
<p> </p>
<button className="joke-back" onClick={() => setPage && setPage("jokelanding")}>
  ← Return Home
</button>
            {rating > 0 && (
              <p className="rating-note">
                saved.
              </p>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

