// Elementos del DOM:
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const answerButtonsElement = document.getElementById('answer-buttons')
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container')
let questionElement = document.getElementById('question')
const finalScoreContainer = document.getElementById('final-score-container');

// URL de la API:
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'

//Variables GLobales:
let dataQuiz;
let current = 0;
let score = 0;

//Limpiar locaStorage cada vez que carga: 
localStorage.clear()

// Importación del BackUp:
import {backupJSON} from './quiz.js'

// Función que llama a los datos del local storage:
async function questionList() {

//Hacer ternario para que en caso que la response sea undefined, coja el JSON local
  try {
    const res = await axios.get(apiUrl) 
    const saveData = res ? JSON.stringify(res.data.results) : JSON.stringify(backupJSON);
    localStorage.setItem("data", saveData)
    dataQuiz = JSON.parse(localStorage.getItem("data"))
    return showQuestion(dataQuiz, current)
  }catch (error) {
    console.error(error)
    localStorage.setItem("dataBackup", JSON.stringify(backupJSON))
  }
}   

// Función de inicio del quiz:
function startGame(e) {
  e.preventDefault()
  startButton.classList.add('hide')
  questionContainerElement.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  questionList();
}

// Función que muestra las preguntas por DOM:
function showQuestion(dataQuiz, current) {
  questionElement.innerHTML = '';
  questionElement = document.createElement('h2');
  
  questionElement.innerHTML += `${dataQuiz[current].question}`; 
  
  nextButton.classList.add('hide')
  answerButtonsElement.innerHTML = ''; // Limpia los botones anteriores.
  answerButtonsElement.appendChild(questionElement);
  
  const correctAnswer = dataQuiz[current].correct_answer;
  const incorrectAnswers = dataQuiz[current].incorrect_answers;
  
// Combinar arrays de respuestas:
  const allAnswers = [correctAnswer].concat(incorrectAnswers);  
  
//Mezclar arrays de respuestas:
  for (let i = allAnswers.length -1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
  }
  
//Mostrar las preguntas mezcladas:
  allAnswers.forEach((answer, index) =>{
    const answersButton = document.createElement('button')
    answersButton.className += "btn btn-sm btn-warning"
    answersButton.textContent = answer;
    answersButton.dataset.index = index;
    answersButton.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(answersButton);
  })
}
//COMRPOBAR SI ES CORRECTO (HACEIS LO QUE TENGAIS QUE HACER)
function selectAnswer(event) {
// Guardar las respuestas en localStorage:
  const quizProgress = {
    currentQuestion: current + 1,
    score: score,
    dataQuiz: dataQuiz
  };
  
  const correctOption = dataQuiz[current].correct_answer;

// Bloquear las respuestas al seleccionar una:
   answerButtonsElement.querySelectorAll('button').forEach(button => {
    button.disabled = true;
  });

  event.target.classList.remove('btn-warning');
// Comprobación de si es correcto y sumar al resultado: 
  if (event.target.textContent === correctOption) {
    score++;
    
    event.target.className += " btn-success";
    console.log(score);
  }else{
    event.target.className += " btn-danger";
    console.log("pues no")
  }
  nextButton.classList.remove('hide')
// Subiendo a localStorage los resultados de las repuestas: 
  localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
}

function nextQuestion(){
//Condicional para saber si quedan aún preguntas:
    if (current < dataQuiz.length - 1) {
      current++;
      showQuestion(dataQuiz, current);
    } else {
// Esconder elementos del quiz
      questionContainerElement.classList.add('hide');
      nextButton.classList.add('hide');
      answerButtonsElement.innerHTML = ''; // Limpiar botones de respuesta
  
// Mostrar elementos del resultado final
      finalScoreContainer.classList.remove('hide');
  
// Crear y mostrar el resultado final en el DOM
      const finalScoreElement = document.createElement('h3');
      finalScoreElement.textContent = `¡Enhorabuena! Tu puntuación final es de ${score}/10`;
      finalScoreContainer.appendChild(finalScoreElement);
      
// Crear y mostrar el botón de reinicio en el DOM
      restartButton.classList.remove('hide');
    }  
}

function restartGame(e) {
  e.preventDefault();
  window.location.reload(); // Reload the page to restart the quiz
}
nextButton.addEventListener('click', nextQuestion)
restartButton.addEventListener('click', restartGame); // Reiniciar el quiz al hacer clic
startButton.addEventListener('click', startGame)


    //Pintar en pantalla una pregunta

    //Pintar todas

    //detectar que estas pulsando

    //detectar si es correcta o incorrecta 

    //pasar a la siguiente pregunta(Ultimo de momento)