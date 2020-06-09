const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("optionsAnswer"));

let questionFaced = {};
let allowtoAnswer = false;
let allQuestions = [];

let questions = [{
        question: "How is the Coronavirus transmitted?",
        choice1: "Through droplets that come form your mouth and nose when you cough or breathe out",
        choice2: "By drinking unclean water",
        choice3: "Through air",
        choice4: "All of the above",
        answer: 1
    },
    {
        question: "What are the common symptoms of COVID-19?",
        choice1: "Continuous cough",
        choice2: "Fever",
        choice3: "Tiredness",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Can you tell if someone has COVID-19?",
        choice1: "No- not everyone show symptoms",
        choice2: "Yes- it will be obvious, a person with COVID-19 coughs a lot",
        choice3: "Yes- you can tell just by where a person comes from",
        choice4: "None of the above",
        answer: 1
    },
    {
        question: "Which of the following is an example of physical distancing.",
        choice1: "You stop talking to the people you live with",
        choice2: "You stop going to crowded places and vist other people's houses",
        choice3: "You stop speaking to your friends on the phone",
        choice4: "You lock yourself in your room and only come out when necessary",
        answer: 2
    }
];

const Reward = 10;

beginQuiz = () => {
    currentQuestion = 0;
    score = 0;
    allQuestions = [...questions];
    nextQuestion();
};

nextQuestion = () => {
    if (allQuestions.length === 0) {
        localStorage.setItem('obtainedScore', score)
        return window.location.assign("stop.html");
    }
    currentQuestion++;
    currentQuestionText.innerText = currentQuestion;
    const questionIndex = Math.floor(Math.random() * allQuestions.length);
    questionFaced = allQuestions[questionIndex];
    question.innerText = questionFaced.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = questionFaced["choice" + number];
    });

    allQuestions.splice(questionIndex, 1);
    allowtoAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!allowtoAnswer) return;

        allowtoAnswer = false;
        const userChoice = e.target;
        const userAnswer = userChoice.dataset["number"];

        const rightORwrong = userAnswer == questionFaced.answer ? "correct" : "incorrect";

        if (rightORwrong == 'correct') {
            obtainedScore(Reward);
        }
        userChoice.parentElement.classList.add(rightORwrong);
        setTimeout(() => {
            userChoice.parentElement.classList.remove(rightORwrong);
            nextQuestion();
        }, 500);
    });
});

const currentQuestionText = document.getElementById('currentQuestion');
const scoreText = document.getElementById('score');

let score = 0;
let currentQuestion = 0;

obtainedScore = num => {
    score = score + num;
    scoreText.innerText = score;
};

beginQuiz();