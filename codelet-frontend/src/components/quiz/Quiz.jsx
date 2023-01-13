import { useEffect, useState, Fragment, useContext } from "react";
import "./game.css";
import SimpleCountdown from "./SimpleCountdown.jsx";
import EndScreen from "./EndScreen.jsx";
import { createContext } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { saveQuizToDb } from "../../api_helper/user_functions";
import { UserContext } from "../../App";

const COUNTDOWN_TIME = 3;
const CHANGE_QUESTION_DELAY = 2000;

export const quizContext = createContext({});

const Quiz = () => {
    const questions = [
        {
            question: "What will be the output?",
            code: "x=[i-1 for i in range(1,10)]\nprint(x)",
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
            code: "name='jAck'\nname = name.capitalize()\nprint(name)",
            options: [
                { choice: "A", answer: "JACK" },
                { choice: "B", answer: "jack" },
                { choice: "C", answer: "Jack" },
                { choice: "D", answer: "JAck" },
            ],
            correct: "A",
        },
        {
            question: "What will be the output?",
            code: "x = [1,2,3]\ny=x\ny[1] = 4\nprint(x)",
            options: [
                { choice: "A", answer: "[1,2,3]" },
                { choice: "B", answer: "[4,2,3]" },
                { choice: "C", answer: "[1,4,3]" },
                { choice: "D", answer: "[1,2,4]" },
            ],
            correct: "A",
        },
    ];

    const [seconds, setSeconds] = useState(COUNTDOWN_TIME);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [btnClicked, setBtnClicked] = useState(false);
    const [answerGiven, setanswerGiven] = useState(false);
    const [shouldDisplayAnswer, setShouldDisplayAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [shouldEnd, setShouldEnd] = useState(false);

    var quizEnded = currentQuestion + 1 == questions.length + 1;
    const userObj = useContext(UserContext).userObj;

    useEffect(() => {
        //wait until questions run out and save quiz results into database
        if (quizEnded) {
            saveQuizToDb(userObj.id, score);
        }
    }, [currentQuestion]);

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
        setanswerGiven([undefined, questions[currentQuestion].correct]);
        setBtnClicked(false);
        setShouldDisplayAnswer(false);
        if (currentQuestion + 1 == questions.length + 1) setanswerGiven(false);
    };
    useEffect(() => {
        // reveal answer after timer passes
        if (seconds == 0) setShouldDisplayAnswer(true);
    }, [seconds]);
    useEffect(() => {
        if (!quizEnded) {
            setanswerGiven([undefined, questions[currentQuestion].correct]);
        }
        // this piece of code is handling what happens when timer passes
        // it reveals correct answer whether user clicked something or not
        // if user selected correct option his score goes up
        // if user had not selected any option, correct option is revealed
        // without granting any points
        if (seconds > 0) return;
        let correctAns = document.getElementById(answerGiven[1]);
        console.log(answerGiven[0], answerGiven[1]);
        console.log(btnClicked);
        if (!btnClicked) {
            correctAns.classList.add("correct");
        } else if (btnClicked) {
            if (answerGiven[0] === answerGiven[1]) {
                console.log("correct");
                btnClicked.classList.add("correct");
                btnClicked.classList.remove("answerGiven");
                setScore(score + 1);
            } else {
                //mark selected answer as incorrect and reveal correct answer
                btnClicked.classList.add("incorrect");
                correctAns.classList.add("correct");
            }
        }
        //  after 3s go to next question
        // setTimeout(() => {
        //     nextQuestion();
        // }, CHANGE_QUESTION_DELAY);
    }, [shouldDisplayAnswer]);

    const optionClicked = (choice, correct) => {
        // following code will make button yellow indicating that option
        // has been selected, it also prevents from selecting two options at the same time
        console.log(choice, correct);
        if (!answerGiven[0]) {
            setanswerGiven([choice, correct]);
            let btn = document.getElementById(choice);
            btn.classList.add("answerGiven");
            btn.classList.remove("defaultOption");
        }
    };
    return (
        <quizContext.Provider value={{ nextQuestion, seconds, setSeconds, shouldEnd, setShouldEnd }}>
            {quizEnded ? (
                <EndScreen />
            ) : (
                <Fragment>
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
                                        className="option-btn defaultOption"
                                        id={option.choice}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            optionClicked(option.choice, questions[currentQuestion].correct);
                                            setBtnClicked(e.target);
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
                </Fragment>
            )}
        </quizContext.Provider>
    );
};

export default Quiz;
