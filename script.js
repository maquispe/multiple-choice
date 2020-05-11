var highScores = [];


$('.start').on('click', function(){
  $('.start').remove();
  quiz.loadQuestion();
});

// click event when you click the answer

$(document).on("click", ".answer-button", function (e) {
  quiz.clicked(e);
});

$(document).on("click", "#reset", function () {
  quiz.reset();
});

$(document).on("click", "#submit-btn", function () {
  quiz.addInitials();
});
// Variable for questions, an array of objects

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    correctAnswer: "all of the above"
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correctAnswer: "console.log"
  }
];

var quiz = {
  questions: questions,
  currentQuestion: 0,
  counter: 30,
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  
  
  

  countdown: function () {
    quiz.counter--;
    $(".counter").html(quiz.counter);
    if (quiz.counter <= 0) quiz.timeUp();
  },
  loadQuestion: function (){
    timer = setInterval(quiz.countdown, 1000);
    $("#subwrapper").html(
      "<h2> Time to Guess: <span class ='counter'>"+ quiz.counter + "</span> Seconds</h2>"
    );
    $("#subwrapper").append(
      "<h2>" + questions[quiz.currentQuestion].question + "</h2>"
    );
    for (var i = 0; i < questions[quiz.currentQuestion].answers.length; i++) {
      $("#subwrapper").append(
        '<button class="answer-button btn btn-info" id="button- ' +
          i +
          '" data-name="' +
          questions[quiz.currentQuestion].answers[i] +
          '">' +
          questions[quiz.currentQuestion].answers[i] +
          "</button> </br>"
      );
    }
  },
  nextQuestion: function () {
    
    $("#counter").html(quiz.counter);
    quiz.currentQuestion++;
    quiz.loadQuestion();
  },
  timeUp: function () {
    clearInterval(timer);
    quiz.counter = 0;
    quiz.unanswered++;
    $("#subwrapper").html("<h2>Out of time!<h2>");
    $("#subwrapper").append(
      "<h3>The correct answer was: " +
        questions[quiz.currentQuestion].correctAnswer +
        "</h3>"
    );
    if (quiz.currentQuestion == questions.length - 1) {
      setTimeout(quiz.results, 3 * 1000);
    } else {
      setTimeout(quiz.nextQuestion, 3 * 1000);
    }
  },
  results: function () {
    clearInterval(timer);
    $('#game-over').removeClass("d-none");
    $('#d-initials').removeClass("d-none");
    $("#subwrapper").html("<h2>Complete!</h2>");
    $("#subwrapper").append(" Correct: " + quiz.correct + "<br/>");
    $("#subwrapper").append(" Incorrect: " + quiz.incorrect + "<br/>");
    $("#subwrapper").append(" Unanswered: " + quiz.unanswered + "<br/>");
    $("#subwrapper").append("<button id= reset>Try again?</button>");
  },
  
  addInitials: function(){
    $("#d-initials").empty();
    var scoreObj = {
      initials: $("#initials").val(),
      score: quiz.counter,
    };
    
    var highScores = JSON.parse(localStorage.getItem('initials')) || [];
    highScores.push(scoreObj);
    localStorage.setItem('initials', JSON.stringify(highScores));
    for(var i = 0; i < highScores.length; i++){
      $("#d-initials").append("<div>"+highScores[i].initials+" Score: " +highScores[i].score+ "</div>");
    }
    console.log(highScores.score);
    
  },
  
  

  clicked: function (e) {
    clearInterval(timer);
    if (
      $(e.target).data("name") == questions[quiz.currentQuestion].correctAnswer
    ) {
      quiz.answeredCorrectly();
    } else {
      quiz.answeredIncorrectly();
    }
  },
  answeredCorrectly: function () {
    console.log("right!");
    
    quiz.correct++;
    $("#subwrapper").html("<h2> CORRECT!</h2>");
    if (quiz.currentQuestion == questions.length - 1) {
      setTimeout(quiz.results, 2 * 1000);
    } else {
      setTimeout(quiz.nextQuestion, 2 * 1000);
    }
  },
  answeredIncorrectly: function () {
    console.log("wrong");
    if(this){
      quiz.counter -= 5;
    }
    quiz.incorrect++;
    $("#subwrapper").html("<h2> Wrong!</h2>");
    $("#subwrapper").append(
      "<h3>The correct answer was: " +
        questions[quiz.currentQuestion].correctAnswer +
        "</h3>"
    );
    if (quiz.currentQuestion == questions.length - 1) {
      setTimeout(quiz.results, 2 * 1000);
    } else {
      setTimeout(quiz.nextQuestion, 2 * 1000);
    }
  },
  
  
  reset: function () {
    quiz.currentQuestion = 0;
    quiz.counter = 30;
    quiz.correct = 0;
    quiz.incorrect = 0;
    quiz.unanswered = 0;
    quiz.loadQuestion();
    $("#game-over").addClass("d-none");
    $("#d-initials").addClass("d-none");
  }
};



