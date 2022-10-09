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
var categoriesList = []

function App() {

  const [currentPreliminaryQuestion, setCurrentPreliminaryQuestion] = useState(0);
  const [showPreliminaryQuestions, setPreliminaryQuestions] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(0);
  const [category, setCategory] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [showNoCategories, setShowNoCategories] = useState(false)

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
    decideCategory()
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
      setCurrentPreliminaryQuestion(currentPreliminaryQuestion + 1)
    } 
  }

  const decideCategory = () => {
    let max = {"key": 0}

    for(const [key, value] of Object.entries(scoreList)) {
      if(value > Object.values(max)[0]) {
        max = {[key]: value}
      }
      else if (value === Object.values(max)[0]) {
        max[key] = value
      }
    }

    if (Object.values(max)[0] === 0) {
      setShowNoCategories(true);
    }

    if(Object.keys(max).length > 1) {
      categoriesList = QuestionsCategory.filter(function(value) {
        return Object.keys(max).includes(value.name);
      }); 
      setShowCategories(true);
    }
    else {
      switchCategory(Object.keys(max)[0]);
    }    
  }

  const switchCategory = (categoryNameOption) => {
    switch(String(categoryNameOption)){
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

  const chooseCategory = (categoryOption) => {
    switchCategory(categoryOption);
    setShowCategories(false);
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
    setCurrentPreliminaryQuestion(0);
    setShowResults(false);
    setShowNoCategories(false);
    setPreliminaryQuestions(true);
    scoreSoftware = 0
    scoreItInfra = 0
    scoreDesign = 0
    scoreData = 0
    scoreCybersecurity = 0
    scoreManagement = 0
    scoreTesting = 0
    scoreList = []
  };

  return (
    <div class="backgorund">
      <h1>IT work position seeker</h1>
      <br></br>
        <div class="quiz-container">
        {
          showResults ? (
            <div class="container-md">
              <h4>Final Results</h4>
              <br></br>
              <h2>{result}</h2>
              <br></br>
              <button type="button" class="btn btn-secondary" onClick={() => restartGame()}>Restart game</button>
            </div>
          ) : ( 
          showPreliminaryQuestions ? (
            <div class="container-md">
              <p>Question: {currentPreliminaryQuestion + 1} out of {QuestionsPreliminary.length}</p>
              <h5 className="question-text">{QuestionsPreliminary[currentPreliminaryQuestion].question}</h5>
              <br></br>
              <ul class="list-group">
                  {QuestionsPreliminary[currentPreliminaryQuestion].answers.map((option) => {
                    return (
                      <li class="list-group-item"
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
                </ul>
            </div>
          ) : ( 
            showNoCategories ? (
              <div class="container-md">
                <h3>Try again</h3>
                <br></br>
                <p>Hi, we cannot find a proper IT position for you! Please try again and maybe we will find something for you!</p>
                <br></br>
                <button type="button" class="btn btn-secondary" onClick={() => restartGame()}>Restart game</button>
              </div>
            ) : (
              showCategories ? (
                <div class="container-md">
                  <h3>Which category sounds the most interesting for you?</h3>
                  <br></br>
                  <ul class="list-group">
                    {categoriesList.map((option) => {
                      return (
                        <li class="list-group-item"
                          key={option.id}
                          onClick={() => {chooseCategory(option.name)}}
                        >
                          <b>{option.name}</b><br></br><i>{option.description}</i>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : ( 
                <div class="container-md">
                  <h3 className="question-text">{category[currentQuestion].question}</h3>
                  <br></br>
                  <ul class="list-group">
                      {category[currentQuestion].answers.map((option) => {
                        return (
                          <li class="list-group-item"
                            key={option.id}
                            onClick={() => {clickTreeOption(option.next, option.result)}}
                          >
                            {option.text}
                          </li>
                        );
                      })}
                    </ul>
                </div>
              )
            )
            ))
        }
      </div>
    </div>
  );
}

export default App;