import './App.css';
import React, { useState } from "react";
import QuestionsPreliminary from "../src/questions/questions_preliminary.json";
import QuestionsCybersecurity from "../src/questions/questions_cybersecurity.json";
import QuestionsData from "../src/questions/questions_data.json";
import QuestionsDesign from "../src/questions/questions_design.json";
import QuestionsInfrastructure from "../src/questions/questions_it_infrastructure.json";
import QuestionsManagement from "../src/questions/questions_management.json";
import QuestionsSoftware from "../src/questions/questions_software.json";
import QuestionsTesting from "../src/questions/questions_testing.json";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const clickAddingOption = () => {
    if (currentQuestion + 1 < QuestionsPreliminary.length) {
      setCurrentQuestion(currentQuestion + 1);
    } 
  }

  const clickTreeOption = (nextOption, resultOption) => {
    if (nextOption != null) {
      setCurrentQuestion(nextOption-1);
    } else {
      setResult(resultOption);
      setShowResults(true);
    }
  }

  const restartGame = () => {
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    

    <div className="App">
      
      <h1>Work position IT seeker</h1>
      <h2>Question: {currentQuestion + 1} out of {QuestionsPreliminary.length}</h2>
      <h3 className="question-text">{QuestionsPreliminary[currentQuestion].question}</h3>
      <ul>
        {QuestionsPreliminary[currentQuestion].answers.map((option) => {
          return (
            <li
              key={option.id}
              onClick={() => clickAddingOption()}
              >
              {option.text}
            </li>
          );
        })}
      </ul>

      {/* {showResults ? (
        <div className="final-results">
          <h1>Final Results</h1>
          <h3>{result}</h3>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        <><h1>Work position IT seeker</h1><h3 className="question-text">{QuestionsCybersecurity[currentQuestion].question}</h3><ul>
            {QuestionsCybersecurity[currentQuestion].answers.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => clickTreeOption(option.next, option.result)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul></>
      )} */}
        
    </div>
  );
}

export default App;