import React, { useMemo, useState } from 'react';
import QuestionCard from './questioncard.jsx';
import ParisAdventure from "./parisadventure";
import "./App.css";

const VIBES = {
  A: {
    label: 'THE CINEMATIC MENACE',
    description: 'Emotionally intense. Escalates the plot simply by existing.',
    options: [
      {
        title: 'Elphaba (Wicked)',
        text: 'Emotionally intense. Escalates the plot simply by existing.',
      },
      {
        title: 'Nadal on clay',
        text: 'Will suffer dramatically for victory.',
      },
      {
        title: 'Everything Everywhere All At Once',
        text: 'Chaotic emotional odyssey with surprisingly high cardio.',
      },
    ],
  },

  B: {
    label: 'THE SIDE QUEST SPECIALIST',
    description:
      'Elegant movement with side-quest energy and questionable logistics.',
    options: [
      {
        title: 'Federer backhand',
        text: 'Elegant movement that somehow looks effortless.',
      },
      {
        title: 'Indiana Jones',
        text: 'Outdoor competence mixed with questionable decision-making.',
      },
      {
        title: 'Paul McCartney',
        text: 'Adventurous optimism with permanent travelling montage energy.',
      },
    ],
  },

  C: {
    label: 'THE WHIMSICAL ARCHIVIST',
    description:
      'Quietly collecting meaning from tiny details and odd corners.',
    options: [
      {
        title: 'Amélie',
        text: 'Finds meaning in tiny details and strange corners of the world.',
      },
      {
        title: 'George Harrison',
        text: 'Quiet depth with slightly mysterious inner worlds.',
      },
      {
        title: 'Psyduck',
        text: 'Emotionally processing existence in real time.',
      },
    ],
  },

  D: {
    label: 'THE SOFT LAUNCH PRINCESS',
    description: 'Warm atmosphere. Minimal urgency. Maximum vibes.',
    options: [
      {
        title: 'Totoro',
        text: 'Pure comfort presence with zero urgency detected.',
      },
      {
        title: 'Ringo Starr',
        text: 'Unbothered, warm, and surviving mostly through vibes.',
      },
      {
        title: 'Past Lives',
        text: 'Soft emotional realism and beautifully curated atmosphere.',
      },
    ],
  },
};

const QUESTIONS = [
  {
    type: 'text',
    text: 'Who is our main character today?',
    placeholder: 'Enter name...',
  },
  {
    text: 'How is NAME feeling today?',
    answers: [
      { text: 'Alive', scores: { A: 3, B: 1, C: 0, D: 0 } },
      { text: ' Memorable', scores: { A: 1, B: 2, C: 2, D: 0 } },
      { text: ' Peaceful', scores: { A: 0, B: 0, C: 1, D: 3 } },
      { text: ' Horizontal', scores: { A: 0, B: 0, C: 0, D: 4 } },
    ],
  },
  {
    text: 'If NAME entered a film scene right now, what soundtrack would follow her?',
    answers: [
      { text: ' Music of the Night', scores: { A: 0, B: 0, C: 1, D: 3 } },
      { text: ' Defying Gravity', scores: { A: 2, B: 2, C: 0, D: 0 } },
      { text: ' Dancing Queen', scores: { A: 0, B: 1, C: 3, D: 1 } },
      { text: ' One Day More', scores: { A: 1, B: 3, C: 1, D: 0 } },
    ],
  },
  {
    text: 'Today’s greatest inconvenience:',
    answers: [
      { text: ' Tram rides', scores: { A: 0, B: 0, C: 3, D: 1 } },
      { text: ' Getting wet', scores: { A: 3, B: 1, C: 0, D: 0 } },
      { text: ' Humidity', scores: { A: 2, B: 2, C: 0, D: 0 } },
      { text: ' Long walks', scores: { A: 1, B: 3, C: 1, D: 0 } },
    ],
  },
  {
    type: 'scale',
    text: 'On a scale of 1-10, how likely will NAME run after a wild pokemon?',
  },
  {
    text: 'If NAME were in an A24 film, which film would she star in?',
    answers: [
      {
        text: 'Everything Everywhere all at once',
        scores: { A: 0, B: 0, C: 1, D: 3 },
      },
      { text: 'Civil War', scores: { A: 3, B: 1, C: 0, D: 0 } },
      { text: 'Loves Lies Bleeding', scores: { A: 0, B: 2, C: 2, D: 1 } },
      {
        text: 'Past Lives',
        scores: { A: 2, B: 2, C: 1, D: 0 },
      },
    ],
  },
  {
    text: 'If Parliament were forced to debate NAME’s date energy, who would be speaking?',
    answers: [
      { text: '📈 Tharman', scores: { A: 1, B: 2, C: 2, D: 0 } },
      { text: '😵‍💫 Heng Swee Keat', scores: { A: 0, B: 0, C: 1, D: 3 } },
      { text: '🎤 Jamus', scores: { A: 0, B: 1, C: 3, D: 1 } },
      { text: '🧠 LKY', scores: { A: 2, B: 2, C: 0, D: 0 } },
    ],
  },
  {
    text: 'Today’s tennis mood:',
    answers: [
      { text: '🧱 Djokovic defence', scores: { A: 0, B: 1, C: 2, D: 2 } },
      { text: '⚡ Alcaraz drop shot', scores: { A: 3, B: 1, C: 0, D: 0 } },
      { text: '🎾 Federer backhand', scores: { A: 0, B: 2, C: 2, D: 1 } },
      { text: '🟧 Nadal on clay', scores: { A: 1, B: 3, C: 0, D: 0 } },
    ],
  },
  {
    text: 'Today’s resus status:',
    answers: [
      { text: '💉 Full active', scores: { A: 2, B: 2, C: 0, D: 0 } },
      { text: '🛌 Comfort care', scores: { A: 0, B: 0, C: 1, D: 3 } },
      { text: '🫁 Full active + trachy', scores: { A: 4, B: 0, C: 0, D: 0 } },
      { text: '🚫 DNR max ward', scores: { A: 0, B: 1, C: 2, D: 2 } },
    ],
  },
  {
    text: 'Today feels more like:',
    answers: [
      { text: '🥐 Paris café morning', scores: { A: 0, B: 1, C: 2, D: 2 } },
      { text: '🗽 Manhattan at midnight', scores: { A: 3, B: 1, C: 0, D: 0 } },
      { text: '✨ Paris golden hour', scores: { A: 1, B: 2, C: 3, D: 0 } },
      {
        text: '🌧 Rainy Brooklyn bookstore',
        scores: { A: 0, B: 0, C: 1, D: 3 },
      },
    ],
  },
  {
    text: 'Today’s Beatles song:',
    answers: [
      { text: '🚕 Penny Lane', scores: { A: 0, B: 1, C: 3, D: 1 } },
      { text: '🎸 Come Together', scores: { A: 3, B: 1, C: 0, D: 0 } },
      { text: '🛣 Let It Be', scores: { A: 0, B: 0, C: 1, D: 3 } },
      { text: '🌞 Here Comes the Sun', scores: { A: 1, B: 2, C: 2, D: 0 } },
    ],
  },
];

function calculateScores(selectedAnswers) {
  const totals = { A: 0, B: 0, C: 0, D: 0 };

  selectedAnswers.forEach((answer) => {
    if (!answer?.scores) return;

    Object.keys(totals).forEach((key) => {
      totals[key] += answer.scores[key] || 0;
    });
  });

  return totals;
}

function getWinner(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const winnerKey = sorted[0][0];

  const vibe = VIBES[winnerKey];

  const randomOption =
    vibe.options[Math.floor(Math.random() * vibe.options.length)];

  return {
    key: winnerKey,
    score: sorted[0][1],
    vibe,
    randomOption,
    sorted,
  };
}

function getScaleScores(num) {
  if (num <= 3) return { A: 0, B: 0, C: 1, D: 3 };
  if (num <= 6) return { A: 0, B: 1, C: 3, D: 1 };
  if (num <= 8) return { A: 1, B: 3, C: 1, D: 0 };
  return { A: 3, B: 1, C: 0, D: 0 };
}

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [page, setPage] = useState('quiz');

  const currentQuestion = QUESTIONS[questionIndex];

  const scores = useMemo(
    () => calculateScores(selectedAnswers),
    [selectedAnswers]
  );

  const result = useMemo(() => getWinner(scores), [scores]);

  function personaliseText(text) {
    return text.replaceAll('NAME', playerName.trim() || 'she');
  }

  function selectAnswer(answer) {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);

    if (questionIndex === QUESTIONS.length - 1) {
      setShowResult(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function handleNameSubmit() {
    if (!playerName.trim()) return;
    setQuestionIndex(questionIndex + 1);
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
      return;
    }

    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  function restart() {
    setQuestionIndex(0);
    setSelectedAnswers([]);
    setPlayerName('');
    setShowResult(false);
    setPage('quiz');
  }

  if (page === "mail") {
    return (
      <div className="mail-page">
        <div className="mail-card">
          <div className="mail-scene">
            <div className="mail-envelope">💌</div>
            <div className="mail-trail trail-one"></div>
            <div className="mail-trail trail-two"></div>
            <div className="mail-trail trail-three"></div>
          </div>
  
          <h1>Sending your results...</h1>
  
          <p>
            Your answers are being sealed, stamped, and sent to the next mysterious department.
          </p>
          <p>
            YOUR DATE HAS BEEN PLANNED!
          </p>
  
          <button className="mail-button" onClick={() => setPage("adventure")}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (page === 'adventure') {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>The Next Chapter Begins...</h1>

        <p style={styles.subtitle}>
          This is where the choose-your-own-adventure section will start.
        </p>
      </div>
    );
  }

  return (
    <QuestionCard
      questionIndex={questionIndex}
      totalQuestions={QUESTIONS.length}
      currentQuestion={currentQuestion}
      showResult={showResult}
      result={result}
      playerName={playerName}
      setPlayerName={setPlayerName}
      personaliseText={personaliseText}
      selectAnswer={selectAnswer}
      handleNameSubmit={handleNameSubmit}
      goBack={goBack}
      restart={restart}
      getScaleScores={getScaleScores}
      setPage={setPage}
    />
  );
}
