import './App.css';
import React, { useState } from "react";
import QuestionsPreliminary from "../src/questions/preliminary_questions.json";
import QuestionsCybersecurity from "../src/questions/questions_cybersecurity.json";
import QuestionsData from "../src/questions/questions_data.json";
import QuestionsDesign from "../src/questions/questions_design.json";
import QuestionsInfrastructure from "../src/questions/questions_it_infrastructure.json";
import QuestionsManagement from "../src/questions/questions_management.json";
import QuestionsSoftware from "../src/questions/questions_software.json";
import QuestionsTesting from "../src/questions/questions_testing.json";

function App() {

  const [showStart, setShowStart] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);
  const [showPreliminaryQuestions, setPreliminaryQuestions] = useState(true);
  const [currentPreliminaryQuestion, setCurrentPreliminaryQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [description, setDescription] = useState(0);

  const clickAddingOption = () => {
    if (currentPreliminaryQuestion + 1 < QuestionsPreliminary.length) {
      setCurrentPreliminaryQuestion(currentPreliminaryQuestion + 1);
    } else {
      setPreliminaryQuestions(false);
    }
  }

  const clickTreeOption = (nextOption, resultOption, resultDescription) => {
    if (nextOption != null) {
      setCurrentQuestion(nextOption-1);
    } else {
      setResult(resultOption);
      setDescription(resultDescription);
      setShowResults(true);
    }
  }

  const startQuiz = () => {
    setShowStart(false);
  }

  const restartQuiz = () => {
    setShowStart(true);
    setShowResults(false);
    setCurrentQuestion(0);
    setCurrentPreliminaryQuestion(0);
    setPreliminaryQuestions(true);
  };

  return (
    
    <div className="App">

      {showStart ? (

        <div className="start-page">
          <h1>Work position IT seeker</h1>
          <p>aaa</p>
          <button onClick={() => startQuiz()}>Start</button>
        </div>

      ) : ( showResults ? (

          <div className="final-results">
            <h1>Final Results</h1>
            <h3>{result}</h3>
            <p>{description}</p>
            <button onClick={() => restartQuiz()}>Restart</button>
          </div>

        ) : ( showPreliminaryQuestions ? (

          <div className="preliminary-questions">
            <h1>Work position IT seeker</h1>
            <h2>Question: {currentPreliminaryQuestion + 1} out of {QuestionsPreliminary.length}</h2><h3 className="question-text">{QuestionsPreliminary[currentPreliminaryQuestion].question}</h3><ul>
              {QuestionsPreliminary[currentPreliminaryQuestion].answers.map((option) => {
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
          </div>

        ) : ( 

          <div className="tree-questions">
            <h1>Work position IT seeker</h1>
            <h3 className="question-text">{QuestionsCybersecurity[currentQuestion].question}</h3><ul>
              {QuestionsCybersecurity[currentQuestion].answers.map((option) => {
                return (
                  <li
                    key={option.id}
                    onClick={() => clickTreeOption(option.next, option.result, option.description)}
                  >
                    {option.text}
                  </li>
                );
              })}
            </ul>
            </div>

        ))
      )}
        
    </div>
  );
}

export default App;