import { useState } from "react";
import "../css/game.css";
import SimpleCountdown from "./SimpleCountdown.jsx";
import { createContext } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";

const COUNTDOWN_TIME = 5;
const CHANGE_QUESTION_DELAY = 2000;

export const quizContext = createContext({});

const Quiz = () => {
    const questions = [
        {
            question: "What will be the output?",
            code: "x=[i-1 for i in range(1,10)]\nprint(x)",
            location: "/codelet-frontendassets/2.png",
            options: [
                { choice: "A", answer: "[0, 1, 2, 3, 4, 5, 6, 7, 8]" },
                { choice: "B", answer: "0 1 2 3 4 5 6 7 8 9" },
                { choice: "C", answer: "0 1 2 3 4 5 6 7 8" },
                { choice: "D", answer: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" },
            ],
            correct: "A",
        },
        {
            question: "What will this code produce?",
            location: "/codelet-frontendassets/2.png",
            code: "name='jAck'\nname = name.capitalize()\nprint(name)",
            options: [
                { choice: "A", answer: "JACK" },
                { choice: "B", answer: "jack" },
                { choice: "C", answer: "Jack" },
                { choice: "D", answer: "JAck" },
            ],
            correct: "A",
        },
    ];

    const [seconds, setSeconds] = useState(COUNTDOWN_TIME);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerGiven, setanswerGiven] = useState(false);
    const [score, setScore] = useState(0);

    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSeconds(COUNTDOWN_TIME);

        let timerParent = document.querySelector(".timerParent");
        let timer = document.querySelector(".timer");
        timerParent.removeChild(timer);
        timerParent.appendChild(timer);
        // console.log(timer);

        let btns = document.querySelectorAll(".option-btn");
        //hide indication for correct/wrong answer, all btns white
        btns.forEach((btn) => {
            btn.classList = "option-btn";
        });
    };

    // nextQuestion();

    const optionClicked = (choice, correct) => {
        // check correct answer
        let btn = document.getElementById(choice);
        if (!answerGiven) {
            setanswerGiven(true);
            if (choice === correct) {
                console.log("correct");
                btn.classList.add("correct");
                setScore(score + 1);
            } else {
                console.log("incorrect");
                btn.classList.add("incorrect");
            }
        }
        //display times and after 3s go to next question
        setTimeout(() => {
            // nextQuestion();
        }, CHANGE_QUESTION_DELAY);
    };

    return (
        <quizContext.Provider value={{ nextQuestion, seconds, setSeconds }}>
            <div className="score">Score: {score}</div>
            <div className="game-progress">
                Question {currentQuestion + 1} out of {questions.length}
            </div>
            <div className="question">{questions[currentQuestion].question}</div>
            <div className="osx">
                <CodeBlock
                    text={questions[currentQuestion].code}
                    language="python"
                    showLineNumbers={true}
                    theme={atomOneDark}
                    customStyle={{ borderRadius: ".5rem", textAlign: "left" }}
                ></CodeBlock>
            </div>
            <div className="options">
                {questions[currentQuestion].options.map((option) => {
                    return (
                        <div className="option" key={option.choice}>
                            <button
                                className="option-btn"
                                id={option.choice}
                                onClick={(e) => {
                                    e.preventDefault();
                                    optionClicked(option.choice, questions[currentQuestion].correct);
                                }}
                            >
                                {option.choice}: {option.answer}
                            </button>
                        </div>
                    );
                })}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        nextQuestion();
                    }}
                >
                    Next question
                </button>
                <SimpleCountdown />
            </div>
        </quizContext.Provider>
    );
};

export default Quiz;
