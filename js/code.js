var questions = [
  {
    title: 'what is the javascript1',
    option1: 'Programming language',
    option2: 'Maarup Language',
    option3: 'Maarup Language',
    option4: 'Maarup Language',
    answer: 'Programming language',
  },
  {
    title: 'what is the javascript2',
    option1: 'Programming language',
    option2: 'Maarup Language',
    option3: 'Maarup Language',
    option4: 'Maarup Language',
    answer: 'Programming language',
  },
  {
    title: 'what is the javascript3',
    option1: 'Programming language',
    option2: 'Maarup Language',
    option3: 'Maarup Language',
    option4: 'Maarup Language',
    answer: 'Programming language',
  },
];

var startButton = document.querySelector('.start_btn');

var infoBox = document.querySelector('.info_box');
var currentQuestion = 0;
var restart = document.querySelector('.restart');
var quiz_box = document.querySelector('.quiz_box');

var result_box = document.querySelector('.result_box');

startButton.addEventListener('click', function () {
  infoBox.style.display = 'block';
  startButton.style.display = 'none';
});

restart.addEventListener('click', function () {
  infoBox.style.display = 'none';
  quiz_box.style.display = 'block';
  //show question container
  showQuestion();
});

var qIndex = 0;
var time;
var timer;
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
        <button class="next_btn">Next Questions</button>
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
  if (event.target.textContent.trim() === questions[qIndex].answer) {
    score++;
  }

  clearInterval(timer);
  qIndex++;

  if (qIndex === questions.length) {
    endQuiz(score);
  } else {
    showQuestion();
  }
};

var endQuiz = (score) => {
  quiz_box.style.display = 'none';
  result_box.style.display = 'block';

  //show score
  document.querySelector('#score').textContent = score;
};
