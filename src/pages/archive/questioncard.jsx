export default function QuestionCard({
  questionIndex,
  totalQuestions,
  currentQuestion,
  showResult,
  result,
  playerName,
  setPlayerName,
  personaliseText,
  selectAnswer,
  handleNameSubmit,
  goBack,
  restart,
  getScaleScores,
  setPage,
}) {
  const progressPercent = showResult
    ? 100
    : Math.round((questionIndex / (totalQuestions - 1)) * 100);

  if (showResult) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <div style={styles.topRow}>
            <span style={styles.eyebrow}>FINAL DOSSIER</span>
            <span style={styles.badge}>RESULT</span>
          </div>

          <h1 style={styles.title}>
            {playerName.trim() ? `${playerName.trim()} is...` : 'Result:'}
          </h1>

          <div style={styles.resultBox}>
            <h2 style={styles.resultTitle}>
              {result.randomOption.title}
            </h2>

            <p style={styles.resultText}>
              {result.randomOption.text}
            </p>
          </div>
          <button
            style={styles.button}
            onClick={() => setPage("mail")}
          >
            Send Results
          </button>
          <div style={styles.buttonRow}>
            <button onClick={goBack} style={styles.secondaryButton}>
              Back
            </button>
            <button onClick={restart} style={styles.primaryButton}>
              Restart
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.topRow}>
          <span style={styles.eyebrow}>CLASSIFIED</span>
          <span style={styles.badge}>
            {questionIndex === 0
              ? 'START'
              : `QUESTION ${questionIndex}/${totalQuestions - 1}`}
          </span>
        </div>

        <h1 style={styles.title}>{personaliseText(currentQuestion.text)}</h1>

        <p style={styles.subtitle}>
          Choose wisely...
        </p>

        {currentQuestion.type === 'text' && (
          <div style={styles.answerGridSingle}>
            <input
              type="text"
              value={playerName}
              placeholder={currentQuestion.placeholder}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSubmit();
              }}
              style={styles.input}
            />

            <button
              onClick={handleNameSubmit}
              disabled={!playerName.trim()}
              style={
                !playerName.trim()
                  ? styles.disabledButton
                  : styles.primaryButton
              }
            >
              Begin
            </button>
          </div>
        )}

        {currentQuestion.type === 'scale' && (
          <div style={styles.scaleGrid}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                style={styles.answerButton}
                onClick={() =>
                  selectAnswer({
                    text: `Level ${num}`,
                    scores: getScaleScores(num),
                  })
                }
              >
                <span style={styles.answerMain}>{num}</span>
                
              </button>
            ))}
          </div>
        )}

        {!currentQuestion.type && (
          <div style={styles.answerGrid}>
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.text}
                onClick={() => selectAnswer(answer)}
                style={styles.answerButton}
              >
                <span style={styles.answerMain}>{answer.text}</span>
              </button>
            ))}
          </div>
        )}

        <div style={styles.progressBlock}>
          <div style={styles.progressText}>
            <span>MISSION PROGRESS</span>
            <span>{progressPercent}%</span>
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progressPercent}%`,
              }}
            />
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button
            onClick={goBack}
            disabled={questionIndex === 0}
            style={{
              ...styles.secondaryButton,
              opacity: questionIndex === 0 ? 0.35 : 1,
              cursor: questionIndex === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Back
          </button>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1c2435 0%, #080b12 55%, #05060a 100%)',
    color: '#f6ead2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '760px',
    background: 'rgba(17, 24, 39, 0.92)',
    border: '1px solid rgba(185, 154, 85, 0.48)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 28px 80px rgba(0, 0, 0, 0.42)',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '28px',
  },
  eyebrow: {
    fontSize: '12px',
    letterSpacing: '0.32em',
    color: '#b99a55',
    fontWeight: 800,
  },
  badge: {
    fontSize: '12px',
    letterSpacing: '0.12em',
    color: '#e7c56f',
    border: '1px solid rgba(231, 197, 111, 0.55)',
    borderRadius: '999px',
    padding: '8px 12px',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },
  title: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 'clamp(30px, 5vw, 46px)',
    lineHeight: 1.05,
    margin: 0,
    marginBottom: '12px',
    color: '#f6ead2',
  },
  subtitle: {
    color: '#d7c6a3',
    margin: 0,
    marginBottom: '28px',
    fontSize: '16px',
  },
  answerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px',
  },
  answerGridSingle: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    marginTop: '24px',
  },
  scaleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    gap: '14px',
  },
  answerButton: {
    minHeight: '104px',
    padding: '20px',
    borderRadius: '18px',
    border: '1px solid rgba(185, 154, 85, 0.42)',
    background: 'rgba(11, 16, 32, 0.95)',
    color: '#f6ead2',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '19px',
    fontWeight: 800,
    lineHeight: 1.25,
    transition: 'all 160ms ease',
  },
  answerMain: {
    display: 'block',
  },
  answerSub: {
    display: 'block',
    marginTop: '8px',
    color: '#b8a77f',
    fontSize: '13px',
    fontWeight: 600,
  },
  input: {
    padding: '18px',
    borderRadius: '16px',
    border: '1px solid rgba(185, 154, 85, 0.55)',
    background: '#080b12',
    color: '#f6ead2',
    fontSize: '18px',
    outline: 'none',
  },
  progressBlock: {
    marginTop: '30px',
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#b99a55',
    fontSize: '11px',
    letterSpacing: '0.18em',
    fontWeight: 800,
    marginBottom: '10px',
  },
  progressTrack: {
    height: '8px',
    background: '#1f2937',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#b99a55',
    borderRadius: '999px',
    transition: 'width 220ms ease',
  },
  resultBox: {
    marginTop: '24px',
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid rgba(231, 197, 111, 0.45)',
    background: 'rgba(8, 11, 18, 0.7)',
  },
  resultTitle: {
    margin: 0,
    marginBottom: '10px',
    color: '#e7c56f',
    fontSize: '28px',
  },
  resultText: {
    margin: 0,
    color: '#d7c6a3',
    fontSize: '17px',
    lineHeight: 1.6,
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '26px',
  },
  primaryButton: {
    padding: '13px 20px',
    borderRadius: '14px',
    border: '1px solid #e7c56f',
    background: '#b99a55',
    color: '#080b12',
    cursor: 'pointer',
    fontWeight: 900,
  },
  secondaryButton: {
    padding: '13px 20px',
    borderRadius: '14px',
    border: '1px solid rgba(185, 154, 85, 0.5)',
    background: 'transparent',
    color: '#f6ead2',
    cursor: 'pointer',
    fontWeight: 800,
  },
  disabledButton: {
    padding: '13px 20px',
    borderRadius: '14px',
    border: '1px solid rgba(185, 154, 85, 0.25)',
    background: '#3f3f46',
    color: '#a1a1aa',
    cursor: 'not-allowed',
    fontWeight: 900,
  },
};
