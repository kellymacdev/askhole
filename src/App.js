import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [includeNonStandard, setIncludeNonStandard] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // fetch data from Google Sheets
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('YOUR_SHEET_API_URL');
      const data = await res.json();

      // Map your data into a cleaner structure
      const parsed = data.map(row => ({
        question: row.question,
        nonStandard: row.nonStandard === 'TRUE'
      }));
      setQuestions(parsed);
    }

    fetchData();
  }, []);

  function getNextQuestion() {
    const filtered = includeNonStandard
      ? questions
      : questions.filter(q => !q.nonStandard);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setCurrentQuestion(filtered[randomIndex]);
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Question Generator</h1>

      <label className="flex justify-center items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={includeNonStandard}
          onChange={() => setIncludeNonStandard(!includeNonStandard)}
        />
        Include non-standard questions
      </label>

      <div className="mb-4">
        {currentQuestion ? (
          <p className="text-lg">{currentQuestion.question}</p>
        ) : (
          <p>Press next to start!</p>
        )}
      </div>

      <button
        onClick={getNextQuestion}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Next Question
      </button>
    </div>
  );
}

export default App;
