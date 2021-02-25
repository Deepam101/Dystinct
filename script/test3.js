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
    new Question("../assets/t31.png","Who was the first President of the United States?", [ "George Washington", "Thomas Jefferson", "Thomas Edison", "I don't know" ], "George Washington"),
    new Question("../assets/t32.png","What is the answer to the Ultimate Question of Life, the Universe, and Everything?", ["Pi","42", "Wah?", "I don't know"], "42"),
    new Question("../assets/t33.png","Do you love to code?", ["No","Yes", "Hell Yeah", "No"], "Hell Yeah"),
    new Question("../assets/t34.png","What's the best programming language?", ["Javascript","C#", "Php", "Python"], "Javascript"),
    new Question("../assets/t35.png","Is Jason Chan Awesome?", ["Yes","No", "Maybe", "He's okay"], "Yes")
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();