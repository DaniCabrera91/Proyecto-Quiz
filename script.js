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
    //   startGame(resString)
    } catch (error) {
      console.error(error)
      localStorage.setItem("dataRespaldo", JSON.stringify(backupJSON))
    }
   }
   


let currentQuestionIndex

function startGame(arrayQuiz) {
    console.log(arrayQuiz)
    //Guardar en localStorage
    localStorage.setItem('quiz', arrayQuiz)

    //Pintar en pantalla una pregunta

    //Pintar todas

    //detectar que estas pulsando

    //detectar si es correcta o incorrecta 

    //pasar a la siguiente pregunta(Ultimo de momento)
//  startButton.classList.add('hide')
//  currentQuestionIndex = 0
//  questionContainerElement.classList.remove('hide')
}



startButton.addEventListener('click', questionList)


 
