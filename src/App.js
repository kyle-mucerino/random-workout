import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Define predefined options for muscle and difficulty
  const muscleOptions = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps"
  ];

  const difficultyOptions = ["beginner", "intermediate", "expert"];

  const fetchExercises = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
        {
          params: { muscle, difficulty },
          headers: {
            "X-RapidAPI-Key":
              "931562259emsh725cb21c9c42981p16a7c1jsn8b28145da88e",
            "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com"
          }
        }
      );

      setExercises(response.data);
      setLoading(false);
      setShowResults(true);
    } catch (err) {
      setLoading(false);
      setError("An error occurred while fetching exercises.");
    }
  };

  return (
    <React.Fragment>
      <div className="app-container">
        <div className="input-container">
          <label htmlFor="muscle">
            <b>Muscle:</b>
          </label>
          <select id="muscle" onChange={(e) => setMuscle(e.target.value)}>
            <option value="">Select Muscle</option>
            {muscleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="difficulty">
            <b>Difficulty:</b>
          </label>
          <select
            id="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="button-container">
        <button onClick={fetchExercises}>Find Exercises</button>
      </div>
      {showResults && (
        <div className="results">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <h2>Exercise Options</h2>
          <ol>
            {exercises.map((exercise) => (
              <li key={exercise.id}>{exercise.name}</li>
            ))}
          </ol>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
