const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'

let dataItem;
let current = 0;


import {backupJSON} from './quiz.js'
async function questionList() {
  //Hacer ternario para que en caso que la response sea undefined, coja el JSON local
  try {
    const res = await axios.get(apiUrl) 
    const saveData = res ? JSON.stringify(res.data.results) : JSON.stringify(backupJSON);
    localStorage.setItem("data", saveData)
    dataItem = JSON.parse(localStorage.getItem("data"))
    console.log(dataItem);
    return showQuestion(dataItem, current)
    //startGame(resString)
  }catch (error) {
    console.error(error)
    localStorage.setItem("dataBackup", JSON.stringify(backupJSON))
    return showQuestion(dataItem, current)
  }
}   

function startGame() {

  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  questionList();
}


    function showQuestion(dataQuiz, current) {
      const questionElement = document.createElement('p');
      console.log(questionElement.innerHTML += `${dataQuiz[current].question}`) 
      const questionContainer = document.getElementById('question-container');
      questionContainer.appendChild(questionElement);

      // answerButtonsElement = document.createElement('button');
      // console.log(questionElement.innerHTML += `${dataQuiz[current].incorrect_answers}`) 
      // questionContainer = document.getElementById('question-container');
      // questionContainer.appendChild(questionElement);
    }
    function selectedAnswer(){
     //COMRPOBAR SI ES CORRECTO (HACEIS LO QUE TENGAIS QUE HACER)
    }
    
startButton.addEventListener('click', startGame)

    //Pintar en pantalla una pregunta

    //Pintar todas

    //detectar que estas pulsando

    //detectar si es correcta o incorrecta 

    //pasar a la siguiente pregunta(Ultimo de momento)