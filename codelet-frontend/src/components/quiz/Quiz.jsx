import { useEffect, useState, Fragment, useContext } from "react";
import "./game.css";
import SimpleCountdown from "./SimpleCountdown.jsx";
import EndScreen from "./EndScreen.jsx";
import { createContext } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { fetchQuiz, saveQuizToDb } from "../../api_helper/user_functions";
import { UserContext } from "../../App";

const COUNTDOWN_TIME = 3;
const CHANGE_QUESTION_DELAY = 2000;

export const quizContext = createContext({});

const Quiz = () => {
    let quizName = window.location.href.split("/")[4];
    const [questions, setQuestions] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            async function getQuiz() {
                let quiz = await fetchQuiz(quizName);
                console.log(quiz);
                setQuestions(quiz.data);
            }
            getQuiz();
        }
    }, [loading]);

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

    useEffect(() => {
        if (currentQuestion == 0 && questions)
            //when on first question, after questions are fetched from db
            //add correct option to `answerGiven` state so it can be validated propertly
            setanswerGiven([undefined, questions[currentQuestion].correct]);
    }, [questions]);

    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setanswerGiven([undefined, questions[currentQuestion].correct]);
        setSeconds(COUNTDOWN_TIME);

        let timerParent = document.querySelector(".timerParent");
        let timer = document.querySelector(".timer");
        timerParent.removeChild(timer);
        timerParent.appendChild(timer);
        let btns = document.querySelectorAll(".option-btn");
        console.log(btns);
        //hide indication for correct/wrong answer, all btns white
        btns.forEach((btn) => {
            btn.classList = "option-btn";
            btn.disabled = false;
        });
        setBtnClicked(false);
        setShouldDisplayAnswer(false);
        if (currentQuestion + 1 == questions.length + 1) setanswerGiven(false);
    };
    useEffect(() => {
        // reveal answer after timer passes
        if (seconds == 0) setShouldDisplayAnswer(true);
    }, [seconds]);

    useEffect(() => {
        if (!shouldDisplayAnswer) return;
        if (!quizEnded) {
            console.log("catch");
            setanswerGiven([undefined, questions[currentQuestion].correct]);
        }
    }, [shouldDisplayAnswer]);

    useEffect(() => {
        // this piece of code is handling what happens when timer passes
        // it reveals correct answer whether user clicked something or not
        // if user selected correct option his score goes up
        // if user had not selected any option, correct option is revealed
        // without granting any points

        //  after 3s go to next question
        // setTimeout(() => {
        //     nextQuestion();
        // }, CHANGE_QUESTION_DELAY);
        if (!shouldDisplayAnswer) return;
        console.log(answerGiven);
        let correctAns = document.getElementById(answerGiven[1]);

        if (!btnClicked) {
            correctAns.classList.add("correct");
        } else if (btnClicked) {
            if (answerGiven[0] == answerGiven[1]) {
                console.log("correct");
                btnClicked.classList.add("correct");
                btnClicked.classList.remove("answerGiven");
                setScore(score + 1);
                return;
            } else {
                //mark selected answer as incorrect and reveal correct answer
                console.log(answerGiven);
                btnClicked.classList.add("incorrect");
                correctAns.classList.add("correct");
                return;
            }
        }
        let buttons = document.querySelectorAll(".option-btn");
        buttons.forEach((btn) => {
            btn.disabled = true;
        });
    }, [shouldDisplayAnswer]);

    const optionClicked = (choice, correct) => {
        // following code will make button yellow indicating that option
        // has been selected, it also prevents from selecting two options at the same time
        if (!answerGiven[0]) {
            console.log(choice, correct);
            setanswerGiven([choice, correct]);
            let btn = document.getElementById(choice);
            btn.classList.add("answerGiven");
            btn.classList.remove("defaultOption");
        }
    };

    // let providedFunctions = [
    //     nextQuestion,
    //     seconds,
    //     setSeconds,
    //     shouldEnd,
    //     setShouldEnd,
    //     questions,
    //     currentQuestion,
    //     optionClicked,
    // ];

    let coreFunctions = {
        score: score,
        questions: questions,
        optionClicked: optionClicked,
        setBtnClicked: setBtnClicked,
        nextQuestion: nextQuestion,
        currentQuestion: currentQuestion,
    };
    if (!loading && questions) {
        return (
            <quizContext.Provider
                value={{
                    nextQuestion,
                    seconds,
                    setSeconds,
                    shouldEnd,
                    setShouldEnd,
                    questions,
                    currentQuestion,
                    optionClicked,
                }}
            >
                {quizEnded ? <EndScreen /> : <QuizCore f={coreFunctions} />}
            </quizContext.Provider>
        );
    } else {
        return "loading..";
    }
};

const QuizCore = ({ f }) => {
    return (
        <div className="middle">
            <div className="score">Score: {f.score}</div>
            <div className="game-progress">
                Question {f.currentQuestion + 1} out of {f.questions.length}
            </div>
            <div className="question">{f.questions[f.currentQuestion].question}</div>
            <div className="osx">
                <CodeBlock
                    text={f.questions[f.currentQuestion].code}
                    language="python"
                    showLineNumbers={true}
                    theme={atomOneDark}
                    customStyle={{ borderRadius: ".5rem", textAlign: "left" }}
                ></CodeBlock>
            </div>
            <div className="options">
                {f.questions[f.currentQuestion].options.map((option) => {
                    return (
                        <div className="option" key={option.choice}>
                            <button
                                className="option-btn defaultOption"
                                id={option.choice}
                                onClick={(e) => {
                                    e.preventDefault();
                                    f.optionClicked(option.choice, f.questions[f.currentQuestion].correct);
                                    f.setBtnClicked(e.target);
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
                        f.nextQuestion();
                    }}
                >
                    Next question
                </button>
                <SimpleCountdown />
            </div>
        </div>
    );
};

export default Quiz;
