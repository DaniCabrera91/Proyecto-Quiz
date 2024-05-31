
# PROYECTO QUIZ

El proyecto consiste en desarrollar un cuestionario, también conocido como Quiz, capaz de mostrar los resultados erróneos y correctos.

- El Quiz consta de 10 preguntas. Cada pregunta plantea 4 opciones como respuesta y sólo una de ellas es la correcta.
- Si la opción elegida es correcta aparecerá señalada en verde, y si es incorrecta en rojo.
- Las preguntas provienen de la API "opentdb". La categoría seleccionada es Science: Computers y la dificultad de las preguntas es media.
- La aplicación es una SPA (single-page application). Sólo se muestra en pantalla una pregunta cada vez.
- Se ha utilizado Bootstrap para la maquetación de la página.




## Autores

- Dani [@DaniCabrera91](https://github.com/DaniCabrera91)
- Joana [@jocamp7](https://github.com/jocamp7)
- Jon [@adoptajunior](https://github.com/adoptajunior)


## API

#### Devuelve 10 preguntas sobre tecnología y ofrece cuatro posibles respuestas por pregunta. Únicamente una de ellas será correcta. 

```https
  https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple
```

## Planteamiento

- Dada la saturación de la API decidimos crear un JSON alternativo que cargue las preguntas cuando no pueda obtenerlas de la API. 
```js
import {backupJSON} from './quiz.js'
```

- Limpiamos localStorage cara vez que se carga el Quiz. 
```js
localStorage.removeItem("data");
```

- Creamos una función que llama a los datos del localStorage.
- Mediante un ternario accedemos al JSON local cuando se recibe "undefined".

```js
async function questionList() {

try {
    const res = await axios.get(apiUrl) 
    const saveData = res ? JSON.stringify(res.data.results) : JSON.stringify(backupJSON);
    localStorage.setItem("data", saveData)
    dataQuiz = JSON.parse(localStorage.getItem("data"))
    return showQuestion(dataQuiz, current)
  }catch (error) {
    localStorage.setItem("dataBackup", JSON.stringify(backupJSON))
    dataQuiz = JSON.parse(localStorage.getItem("dataBackup"))
    return showQuestion(dataQuiz.results,current);
  }

}   
```




## Funcionalidades

- Página principal: Muestra un botón de comienzo en el centro de la pantalla.
- Al pulsarlo se carga la primera pregunta y se crea en localStorage el almacenaje del nuevo quiz. 
- Cuando el usuario escoge una respuesta se bloquean los botones para que no pueda seleccionar otra.
- Almacenamos la respuesta que ha escogido y si ha sido correcta o incorrecta.
- El usuario debe pulsar el botón "next" para pasar a la siguiente pregunta.
- No podrá dejar sin responder la pregunta al no cargar el botón "next".
- Se van almacenando de la misma forma sus respuestas hasta que responde las 10 y aparece una pantalla final con su puntuación y un botón que permita re-iniciar el quiz. 
- Si el usuario acierta al menos la mitad de las preguntas le daremos la enhorabuena o en caso contrario, le animaremos a seguir jugando para mejorar.

