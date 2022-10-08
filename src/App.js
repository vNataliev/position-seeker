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
import QuestionsCategory from "../src/questions/category_descriptions.json";

let scoreSoftware = 0
let scoreItInfra = 0
let scoreDesign = 0
let scoreData = 0
let scoreCybersecurity = 0
let scoreManagement = 0
let scoreTesting = 0
let scoreList = []

function App() {

  const [currentPreliminaryQuestion, setCurrentPreliminaryQuestion] = useState(0);
  const [showPreliminaryQuestions, setPreliminaryQuestions] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);
  const [category, setCategory] = useState('')
  const [showCategories, setShowCategories] = useState(false)

  const lastPreliminaryQuestionConfig = () => {
    setPreliminaryQuestions(false)
    scoreList = {
      "Software": scoreSoftware,
      "IT Infrastructure": scoreItInfra,
      "Design": scoreDesign,
      "Data": scoreData,
      "Cybersecurity": scoreCybersecurity,
      "Managament": scoreManagement,
      "Testing": scoreTesting
    }
    decideOnGroup()
  }

  const clickAddingOption = (text) => {
    if (currentPreliminaryQuestion < QuestionsPreliminary.length) {      
      if (text === 'Yes') {

        const path = QuestionsPreliminary[currentPreliminaryQuestion].answers[0]
        
        scoreSoftware += path.score_software
        scoreItInfra += path.score_it_infra
        scoreDesign += path.score_design
        scoreData += path.score_data
        scoreCybersecurity += path.score_cybersecurity
        scoreManagement += path.score_management
        scoreTesting += path.score_testing

      }

      // dodać punkty za "nie" ("No")

      setCurrentPreliminaryQuestion(currentPreliminaryQuestion + 1)
    } 
  }

  const decideOnGroup = () => {
    console.log(scoreList)
    let max = {"key": 0}

    for(const [key, value] of Object.entries(scoreList)) {
      if(value > Object.values(max)[0]) {
        max = {[key]: value}
      }
      else if (value === Object.values(max)[0]) {
        max[key] = value
      }
    }

    if(Object.keys(max).length > 1) {
      setShowCategories(true)

      // TODO tutaj odpalić opcję wyświetlenia tego słownika z maxami jesli ich jest wiecej niz jedna kategoria i potem wynik przekazac do setCategory
    //"Which category sounds the most interesting for you? (Wraz z opisami danej kategorii)
    }
    else {
      console.log(Object.keys(max)[0])
      switch(Object.keys(max)[0]){
        case 'Software':
          setCategory(QuestionsSoftware);
          break;
        case 'IT Infrastructure':
          setCategory(QuestionsInfrastructure);
          break;
        case 'Design':
          setCategory(QuestionsDesign);
          break;
        case 'Data':
          setCategory(QuestionsData);
          break;
        case 'Cybersecurity':
          setCategory(QuestionsCybersecurity);
          break;
        case 'Managament':
          setCategory(QuestionsManagement);
          break;
        case 'Testing':
          setCategory(QuestionsTesting);
          break;
      }
    }
    console.log(category)
    
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
    // setCurrentQuestion(0);
    // setCurrentPreliminaryQuestion(0);
    // setShowResults(false);
    // setPreliminaryQuestions(true);
    // setScoreSoftware(0);
    // setScoreItInfra(0);
    // setScoreDesign(0);
    // setScoreData(0);
    // setScoreCybersecurity(0);
    // setScoreManagement(0);
    // setScoreTesting(0);
   // setScoreList(0);
  };

  return (
    

    <div className="App">

      {
        showResults ? (
          <div className="final-results">
            <h1>Final Results</h1>
            <h3>{result}</h3>
            <button onClick={() => restartGame()}>Restart game</button>
          </div>
        ) : ( 
        showPreliminaryQuestions ? (
          <><h1>Work position IT seeker</h1>
          <h2>Question: {currentPreliminaryQuestion + 1} out of {QuestionsPreliminary.length}</h2>
          <h3 className="question-text">{QuestionsPreliminary[currentPreliminaryQuestion].question}</h3>
          <ul>
              {QuestionsPreliminary[currentPreliminaryQuestion].answers.map((option) => {
                return (
                  <li
                    key={option.id}
                    onClick={() => {
                      if (currentPreliminaryQuestion < QuestionsPreliminary.length - 1) {
                        clickAddingOption(option.text)
                      } else {
                        clickAddingOption(option.text)
                        lastPreliminaryQuestionConfig()
                      }
                    }
                    }
                  >
                    {option.text}
                  </li>
                );
              })}
            </ul></>
        ) : ( 
        showCategories ? (
            <>
            <h1>Which category?</h1>
            <ul>
              {QuestionsCategory.map((option) => {
                return (
                  <li
                    key={option.id}
                    onClick={() => {}}
                  >
                    {option.description}
                  </li>
                );
              })}
            </ul>
            </>
        ) : ( 
          <><h1>Work position IT seeker</h1>
          <h3 className="question-text">{category[currentQuestion].question}</h3>
          <ul>
              {category[currentQuestion].answers.map((option) => {
                return (
                  <li
                    key={option.id}
                    onClick={() => {clickTreeOption(option.next, option.result)}}
                  >
                    {option.text}
                  </li>
                );
              })}
            </ul></>
      )))
      }
        
    </div>
  );
}

export default App;