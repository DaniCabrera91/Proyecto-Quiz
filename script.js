const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'

import {backupJSON} from './quiz.js'
async function questionList() {
  //Hacer ternario para que en caso que la response sea undefined, coja el JSON local
  try {
    const res = await axios.get(apiUrl) 
    const saveData = res ? JSON.stringify(res.data.results) : JSON.stringify(backupJSON);
    localStorage.setItem("data", saveData)
    //startGame(resString)
  }catch (error) {
    console.error(error)
    localStorage.setItem("dataBackup", JSON.stringify(backupJSON))
  }
}   

let currentQuestionIndex = backupJSON

function startGame() {
  startButton.classList.add('hide')
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  return showQuestion()
}


function showQuestion(item) {
  console.log(backupJSON);
  questionElement.innerText = item.question
  console.log(item.question);
  item.answers.forEach((answer) => {
  const button = document.createElement('button')
  button.innerText = answer.text
      
  if (answer.correct) {
    button.dataset.correct = true
  }
  button.addEventListener('click', selectAnswer)
  answerButtonsElement.appendChild(button)
  })
}
      

startButton.addEventListener('click', startGame)

    //Pintar en pantalla una pregunta

    //Pintar todas

    //detectar que estas pulsando

    //detectar si es correcta o incorrecta 

    //pasar a la siguiente pregunta(Ultimo de momento)