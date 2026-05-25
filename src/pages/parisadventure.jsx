import { useState } from "react";
import "./parisadventure.css";

const RESULTS = {
  romantic: {
    title: "The Romantic Paris Evening",
    text: `You spent the evening following atmosphere more than direction.

Rain at the right moments. Warm café windows. Bridges lit gold over the Seine.
`,
  },
  elegant: {
    title: "The Elegant Paris Evening",
    text: `You moved through the night with restraint and good instincts.

The evening became a sequence of quiet rooms, well-chosen plates, low conversation, and places that did not need to announce themselves.`,
  },
  wandering: {
    title: "The Wandering Paris Evening",
    text: `You never really chased the destination.

The city itself became the meal: wet pavements, late cafés, small detours, and something warm eaten while walking without a plan.`,
  },
  social: {
    title: "The Parisian Dinner Party",
    text: `At some point, the evening stopped feeling like travel.

You became part of the table: passing plates, listening to stories, and staying longer than you meant to.`,
  },
  chaotic: {
    title: "The Unplanned Paris Evening",
    text: `Your night was held together mostly by instinct.

Somehow, this led to good food, strange timing, unexpected company, and at least one decision that probably should not have worked.`,
  },
};

const SCENES = {
  start: {
    title: "The Bookshop",
    text: `Rain taps against the windows of a small Left Bank bookshop.

Inside an old cookbook, a cream-coloured card slips onto the floor.

“The best meal in Paris is never found directly.”

A rough map is attached, one location circled in blue ink.`,
    choices: [
      { text: "Follow the map", next: "courtyard", points: { romantic: 1 } },
      { text: "Follow the smell of bread outside", next: "bakery", points: { wandering: 1 } },
    ],
  },

  courtyard: {
    title: "The Courtyard",
    text: `The map leads into a hidden courtyard lit by soft yellow lamps.

A small wine bar sits beneath hanging ivy. The owner notices the card immediately.

“Someone sent you,” he says, placing warm gougères on the counter.`,
    choices: [
      { text: "Ask where the map leads", next: "rain", points: { elegant: 1 } },
      { text: "Say nothing and keep exploring", next: "rain", points: { wandering: 1 } },
    ],
  },

  bakery: {
    title: "The Bakery",
    text: `The boulangerie is still open long after sunset.

A baker removes fresh pastries from the oven while old jazz plays from the radio.

On the counter is a jar labelled:

“For travellers chasing good evenings.”`,
    choices: [
      { text: "Ask the baker about the note", next: "rain", points: { social: 1 } },
      { text: "Take the clue and leave quietly", next: "rain", points: { romantic: 1 } },
    ],
  },

  rain: {
    title: "The Rain",
    text: `The sky opens suddenly.

Rain turns the streets gold beneath the lamps.

People run for cover. Somewhere nearby, music leaks from an open doorway.`,
    choices: [
      { text: "Step into the crowded café", next: "stranger", points: { social: 1 } },
      { text: "Cross the bridge toward the lights", next: "stranger", points: { romantic: 1 } },
    ],
  },

  stranger: {
    title: "The Stranger",
    text: `Someone notices the map in your hand.

A sharply dressed stranger smiles.

“You’re looking for the dinner.”

They place a métro ticket beside you.`,
    choices: [
      { text: "Take the ticket", next: "market", points: { chaotic: 1 } },
      { text: "Walk away politely", next: "market", points: { elegant: 1 } },
    ],
  },

  market: {
    title: "The Night Market",
    text: `The map leads to a market hidden beneath strings of lights.

The air smells of butter, smoke, citrus, garlic, and sugar.

One stall serves unfamiliar dishes with no labels. Another serves the classics perfectly.`,
    choices: [
      { text: "Try the unfamiliar dish", next: "address", points: { chaotic: 1 } },
      { text: "Choose the classic dish", next: "address", points: { elegant: 1 } },
    ],
  },

  address: {
    title: "The Missing Restaurant",
    text: `At the end of the street, you find the address on the card.

The restaurant is gone.

Only a faded sign remains.

A woman beside the doorway laughs softly.

“People are always looking for that place.”`,
    choices: [
      { text: "Keep searching", next: "midnight", points: { romantic: 1 } },
      { text: "Forget the search and enjoy the city", next: "midnight", points: { wandering: 1 } },
    ],
  },

  midnight: {
    title: "Midnight",
    text: `The city quiets.

Somewhere in the distance, bells mark midnight.

The night feels less like a route now, and more like an invitation.`,
    choices: [
      { text: "Sit beside the Seine", next: "table", points: { romantic: 1 } },
      { text: "Climb toward Montmartre", next: "table", points: { wandering: 1 } },
    ],
  },

  table: {
    title: "The Secret Table",
    text: `Almost by accident, you arrive.

A candlelit room. A long table. One empty chair.

Nobody asks too many questions.

Plates are passed quietly between strangers.`,
    choices: [
      { text: "Observe quietly", next: "dessert", points: { elegant: 1 } },
      { text: "Join the conversation", next: "dessert", points: { social: 1 } },
    ],
  },

  dessert: {
    title: "Dessert",
    text: `Dessert arrives as the windows begin turning blue with morning.

Someone asks:

“So, did you find the best meal in Paris?”

Only then does the map begin to feel unnecessary.`,
    choices: [
      { text: "Leave before sunrise", next: "result", points: { romantic: 1 } },
      { text: "Stay until morning", next: "result", points: { social: 1 } },
    ],
  },
};

export default function ParisAdventure() {
  const [sceneId, setSceneId] = useState("start");
  const [scores, setScores] = useState({
    romantic: 0,
    elegant: 0,
    wandering: 0,
    social: 0,
    chaotic: 0,
  });

  const scene = SCENES[sceneId];

  function choose(choice) {
    if (choice.points) {
      setScores((previousScores) => {
        const updatedScores = { ...previousScores };

        Object.keys(choice.points).forEach((key) => {
          updatedScores[key] += choice.points[key];
        });

        return updatedScores;
      });
    }

    setSceneId(choice.next);
  }

  function getResult() {
    const winningType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return RESULTS[winningType];
  }

  function restartAdventure() {
    setSceneId("start");
    setScores({
      romantic: 0,
      elegant: 0,
      wandering: 0,
      social: 0,
      chaotic: 0,
    });
  }

  if (sceneId === "result") {
    const result = getResult();

    return (
      <main className="paris-page">
        <section className="paris-card">
          <p className="paris-kicker">Your evening became</p>
          <h1>{result.title}</h1>

          {result.text.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <button className="paris-choice-button" onClick={restartAdventure}>
            Begin Again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="paris-page">
      <section className="paris-card">
        <p className="paris-kicker">Paris Foodie</p>
        <h1>{scene.title}</h1>

        {scene.text.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <div className="paris-choices">
          {scene.choices.map((choice, index) => (
            <button
              key={index}
              className="paris-choice-button"
              onClick={() => choose(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}