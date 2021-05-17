var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    option1: 'string',
    option2: 'boolean',
    option3: 'alerts',
    option4: 'numbers',
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    option1: 'Pquotes',
    option2: 'curly brackets',
    option3: 'parantheses',
    option4: 'square brackets',
    answer: 'parantheses',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    option1: 'commas',
    option2: 'curly brackets',
    option3: 'quotes',
    option4: 'parentheses',
    answer: 'quotes',
  },
];
// variables to reference DOM elements
var startButton = document.querySelector('.start_btn');
var infoBox = document.querySelector('.info_box');

var restart = document.querySelector('.restart');
var quiz_box = document.querySelector('.quiz_box');
var submit = document.querySelector('#submit');
var result_box = document.querySelector('.result_box');
var initialsEl = document.getElementById('initials');
// variables to keep track of quiz state
var currentQuestion = 0;
var qIndex = 0;
var time;
var timer;

// display the Some Rules of this quiz
startButton.addEventListener('click', function () {
  infoBox.style.display = 'block';
  startButton.style.display = 'none';
});

// when click on the "Continue", it should shows questions
restart.addEventListener('click', function () {
  infoBox.style.display = 'none';
  quiz_box.style.display = 'block';
  //show question container
  showQuestion();
});

var showQuestion = () => {
  //reset the time
  time = 15;
  //get current question
  var currentQ = questions[qIndex];
  //create template
  var template = `
    <header>
        <div class="title">Awesome quiz Application</div>
        <div class="timer">
        <div class="timer_text">Time Left</div>
        <div class="timer_sec">15</div>
        </div>
    </header>
    <section>
        <div class="que_text">
        <span>${currentQ.title}</span>
        </div>
        <div class="option_list">
        <div class="option">
            <span>${currentQ.option1}</span>
            <div class="icon tick"><i class="fas fa-check"></i></div>
        </div>
        <div class="option">
            <span>${currentQ.option2}</span>
            <div class="icon cross"><i class="fas fa-check"></i></div>
        </div>
        <div class="option">
            <span>${currentQ.option3}</span>
            <div class="icon tick"><i class="fas fa-check"></i></div>
        </div>
            <div class="option">
            <span>${currentQ.option4}</span>
            <div class="icon tick"><i class="fas fa-check"></i></div>
        </div>
        </div>
    </section>
    <footer>
        <div class="total_que">
        <span>
            <p>${qIndex + 1}</p>
            of
            <p>${questions.length}</p>
            Questions
        </span>
        </div>
       
        <div id="feedback" class="feedback"></div>
    </footer>
    `;
  //converts string into html and replaces container content
  document.querySelector('.quiz_box').innerHTML = template;
  //set timer
  timer = setInterval(() => {
    //reduce the time 1
    time--;
    //show the time reduced
    document.querySelector('.timer_sec').textContent = time;
    // if we should top the time - time === 0
    if (time <= 0) {
      clearInterval(timer);
      qIndex++;

      if (qIndex === questions.length) {
        endQuiz(score);
      } else {
        showQuestion();
      }
    }
  }, 1000);
  //add eventListener to each option
  var optionsArray = document.querySelectorAll('.option');
  optionsArray.forEach((option) => {
    option.addEventListener('click', (event) => {
      handleOptionClick(event);
    });
  });
};

var score = 0;
var handleOptionClick = (event) => {
  //check if answers
  console.log('event', event.target.textContent);
  var feedbackEl = document.getElementById('feedback');
  console.log(feedbackEl);
  if (event.target.textContent.trim() === questions[qIndex].answer) {
    score++;
    feedbackEl.innerHTML = 'Correct!';
  } else {
    feedbackEl.innerHTML = 'Wrong!';
  }
  clearInterval(timer);
  qIndex++;
  setTimeout(function () {
    if (qIndex === questions.length) {
      endQuiz(score);
    } else {
      showQuestion();
    }
  }, 1000);

  // if (qIndex === questions.length) {
  //   endQuiz(score);
  // } else {
  //   showQuestion();
  // }
};

var endQuiz = (score) => {
  quiz_box.style.display = 'none';
  result_box.style.display = 'block';

  //show score
  document.querySelector('#score').textContent = score;
};

submit.onclick = saveHighscore;

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (!initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'highScore.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}
