function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};
function Question(pic, text, choices, answer) {
    this.pic = pic;
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};
var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        a = document.getElementById("graphlink");
        // setAttribute("graphlink", quiz.getCurrentQuestion().pic);
        a.src=quiz.getCurrentQuestion().pic;
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Test Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
        gameOverHTML += "<h2><button> <a href='test4.html'>Go to Test4</a></button></h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },
    
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};
//Create Questions
var questions = [
    new Question("../assets/t31.png","What is the second highest number?", [ "1", "8", "9", "10" ], "8"),
    new Question("../assets/t32.png"," Which Colour covered maximum region in circle?", ["Yellow","Orange", "Red", "Blue"], "Blue"),
    new Question("../assets/t33.png","What is the highest number?", ["5","4.3", "3.9", "1"], "4.3"),
    new Question("../assets/t34.png","What is the smallest number here?", ["2","4", "6", "8"], "2"),
    new Question("../assets/t35.png","How many layers are there?", ["5","6", "7", "4"], "5")
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();