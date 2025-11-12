import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './index.css';

function App() {
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvbwERGAkJMYjoujpgnU0LL_jD0hhqvWMZ_rG3YiP05r3oj9506Eq550kGzOSbCe1uoT_ObcoXh2QG/pub?gid=0&single=true&output=csv';

  const [questions, setQuestions] = useState([]);
  const [includeNonStandard, setIncludeNonStandard] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(SHEET_URL);
        console.log("fetch status:", res.status);
        const text = await res.text();
        console.log("Raw CSV length:", text.length);
        console.log("First 200 chars:", text.slice(0, 200))
        const parsed = Papa.parse(text, { header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            quoteChar: '"'
        }).data;
        console.log("Parsed questions:", parsed);
        parsed.forEach((row, i) => {
        console.log(`Row ${i}:`, row);
        });

        const formatted = parsed
          .map(row => {
            const q = row.Question?.trim();
            if (!q) return null;
            const ns = row.NonStandard?.trim().toUpperCase() === 'TRUE';
            return { question: q, nonStandard: ns };
          })
          .filter(Boolean);

        setQuestions(formatted);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setLoading(false);
      }
    }

    fetchQuestions();
    if (questions.length > 0 && !currentQuestion) {
    getNextQuestion(); // initialize with first question
    }

  }, [questions]);

  function getNextQuestion() {
    if (questions.length === 0) return;

    const filtered = includeNonStandard
      ? questions
      : questions.filter(q => !q.nonStandard);

    if (filtered.length === 0) {
      setCurrentQuestion({ question: 'No questions available with current filter.' });
      return;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);

    // Trigger fade-out and fade-in
    setFade(true);
    setTimeout(() => {
      setCurrentQuestion(filtered[randomIndex]);
      setFade(false);
    }, 200); // fade-out duration matches CSS transition
  }

  return (
      <div className="app-container">
        <h1 className="app-title">Am I the AskHole?</h1>

        {/* Toggle switch */}
        <label className="toggle-container">
          <input
              type="checkbox"
              checked={includeNonStandard}
              onChange={() => setIncludeNonStandard(!includeNonStandard)}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">Include spicy questions</span>
        </label>

        {/* Question card */}
        <div className={`question-card ${fade ? 'fade-out' : ''}`}>
          {loading
              ? "Loading questions..."
              : currentQuestion
                  ? currentQuestion.question
                  : "Press Next to start!"}
        </div>

        {/* Next button */}
        <button className="next-btn" onClick={getNextQuestion}>
          Next Question
        </button>

        <button
            className="next-btn"
            style={{marginTop: '1rem', background: '#55b1b5'}}
            onClick={() => setShowModal(true)}
        >
          Submit a Question
        </button>
        {/* Modal for Google Form */}
{showModal && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-modal" onClick={() => setShowModal(false)}>
        ✕
      </button>
      <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfwSVKy3UX19EzAEGQok3wPKfi5pePQetfxXV91s6E_ifofXg/viewform?embedded=true"
          title="Submit a Question"
      ></iframe>
    </div>
  </div>
)}
      </div>
  );
}

export default App;
