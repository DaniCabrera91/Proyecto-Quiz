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
    const dataItem = JSON.parse(localStorage.getItem("data"))
    console.log(dataItem);
    return showQuestion(dataItem,0)
    //startGame(resString)
  }catch (error) {
    console.error(error)
    localStorage.setItem("dataBackup", JSON.stringify(backupJSON))
  }
}   


function startGame() {

  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  questionList();
}


    function showQuestion(pato, current) {
      console.log(pato[current].question)
      // pato.forEach(element => {
      //   console.log(element.question);
      //   const questionElement = document.createElement('p');
      //   questionElement.innerHTML += `${element.type} Hola` 
      // });

      const questionContainer = document.getElementById('question-container');
      questionContainer.appendChild(questionElement);
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