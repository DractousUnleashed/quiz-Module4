const startButton = document.getElementById('start-btn') //lines 1-5 are all constants to define future functions or programs
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex//shuffles the questions

startButton.addEventListener('click', startGame)//starts the game and also lets you push next button
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

var count = 75;//timer of 75 seconds
var timer = setInterval(function(){
    console.log(count);
    count--;
    if(count === 0){
        stopInterval()
    }
}, 75000);

var stopInterval = function() {
    window.alert('time is up!');
    clearInterval(timer);
}//stops timer after 75 seconds

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}//starts the game while also shuffling the questions

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}//shuffles questions even after start quiz is no longer an option

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}//gives options on quiz along with giving correct/incorrect values to go to CSS

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}//clears for next question

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}//sets array from bottom to answers

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}//sets up right and wrong answers for CSS to change colors

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}//sets up right and wrong answers for CSS to change colors

const questions = [
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Cool Sounding Song', correct: false },
      { text: 'Cascading Style Sheet', correct: true },
      { text: 'Nothing', correct: false },
      { text: 'I do not know', correct: false }
    ]
  },
  {
    question: 'Is JavaScript like math?',
    answers: [
      { text: 'Absolutely', correct: true },
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
      { text: 'I do not know', correct: false }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
      { text: 'I do not know', correct: false }
    ]
  }
]//questions and answers

function getAnswerValue(correctAnswers){
    var x = document.getElementById(correctAnswers);
    for(var y=0; y<x.length; y++)
        if(x[y].checked) return x[y].value;
}//tracks correct answers

function getScore(){
    var score = 0;
    for (var i=0; i<correctAnswers; i++)
        if(getAnswerValue('Question'+i)===answers[i]) score += 1;
    return score;
}//totals score

function returnScore() {
    alert("Your score is " + getScore() + "/3");
}//dispalys score