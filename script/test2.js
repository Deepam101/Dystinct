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
function Question(text, choices, answer) {
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
        gameOverHTML += "<h2><button> <a href='test3.html'>Go to Test3</a></button></h2>";
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
    new Question("Pen, Paper, Pencil, Stone, Scissor", [ "Pen, Paper, Scissor, Stone, Pencil", "Stone, Scissor, Paper, Pen, Pencil", "Pen, Paper, Pencil, Stone, Scissor", "Pencil, Pen, Stone, Scissor, Paper" ], "Pen, Paper, Pencil, Stone, Scissor"),
    new Question("Apple, Mango, Orange, Guava, Pineapple", ["Pineapple, Mango, Orange, Guava, Apple","Apple, Orange, Mango, Guava, Pineapple", "Orange, Apple, Guava, Pineapple, Mango", "Apple, Mango, Orange, Guava, Pineapple"], "Apple, Mango, Orange, Guava, Pineapple"),
    new Question("Potato, Tomato, Brinjal, Cucumber, Gourd", ["Potato, Tomato, Brinjal, Cucumber, Gourd","Brinjal, Potato, Tomato, Gourd, Cucumber", "Potato, Tomato, Brinjal, Cucumber, Gourd", " Potato, Tomato, Cucumber, Brinjal, Gourd"], "Potato, Tomato, Brinjal, Cucumber, Gourd"),
    new Question("Sun, Moon, Star, Sky, Rain", ["Sun, Moon, Star, Sky, Rain","Sky, Moon, Star, Rain, Sun", "Moon, Sun, Star, Rain, Sky", "Sun, Moon, Star, Sky, Rain"], "Sun, Moon, Star, Sky, Rain"),
    new Question("Top, Bottom, Right, Left, Front", ["Front, Top, Bottom, Right, Left","Top, Bottom, Right, Left, Fronto", "Top, Right, Left, Bottom, Front", "Front, Left, Right, Bottom, Top"], "Top, Bottom, Right, Left, Front")
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();