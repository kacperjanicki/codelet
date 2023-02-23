import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { questionContext } from "./Create";

const questionCreateContext = createContext();

//make tab in textareas indent
const tabsInTxt = () => {
    var textareas = document.getElementsByTagName("textarea");
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
        textareas[i].onkeydown = function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                var s = this.selectionStart;
                this.value =
                    this.value.substring(0, this.selectionStart) +
                    "\t" +
                    this.value.substring(this.selectionEnd);
                this.selectionEnd = s + 1;
            }
        };
    }
};

const QuestionCreate = ({ lang }) => {
    const { questionsCreated, setQuestionsCreated, howMany } = useContext(questionContext);
    let questions = questionsCreated;
    let setQuestions = setQuestionsCreated;
    tabsInTxt();

    //make this component multi-step
    useEffect(() => {
        const createQuizForm = document.querySelector("[data-multi-step-q]");
        let formSteps = createQuizForm.querySelectorAll("[data-step-q]");
        if (formSteps) {
            formSteps[0].classList.add("active"); //make first form card visible by default
        }
    });

    useEffect(() => {
        // if (currentStep < 0) {
        //     formSteps[0].classList.add("active");
        // }

        const nextBtns = [...document.querySelectorAll("[data-next-q]")];
        const prvBtns = [...document.querySelectorAll("[data-previous-q]")];
        nextBtns.forEach((nxt) => {
            let parent = nxt.parentElement.parentElement;
            let input =
                parent.querySelector("input") ||
                parent.querySelector("select") ||
                parent.querySelector("#public");
            let txt = parent.querySelector("textarea");

            if (!input) return;
            // input.addEventListener("keydown", (e) => {
            //     if (e.keyCode === 13) {
            //         let btn = parent.querySelector(".btnGroup").querySelector("[data-next-q]");
            //         if (input.name == "select") {
            //             input.click();
            //         } else if (input.name !== "description") {
            //             btn.click();
            //         }
            //         // btn.click();
            //     }
            // });
        });
        // prvBtns.forEach((prv) => {
        //     prv.onclick = (e) => {
        //         e.preventDefault();
        //         formSteps[currentStep].classList.remove("active");
        //         currentStep--;
        //         formSteps[currentStep].classList.add("active");
        //     };
        // });
    }, []);

    const submitQuiz = (e) => {
        e.preventDefault();
        console.log(questions);
        setQuestionsCreated([...questions]);
        let formSteps = document.querySelectorAll("[data-step-q]");
    };

    const [currentStep, setCurrentStep] = useState(0);

    return (
        <questionCreateContext.Provider
            value={{ lang, currentStep, setCurrentStep, questions, setQuestions }}
        >
            <form data-multi-step-q>
                {questions.map((q) => (
                    <SingleQuestion k={q} />
                ))}
                <button onClick={submitQuiz} type="button">
                    Submit
                </button>
            </form>
        </questionCreateContext.Provider>
    );
};

const SingleQuestion = ({ k }) => {
    const { lang, questions, setQuestions, closeModal } = useContext(questionCreateContext);
    const [codeString, setCodeString] = useState("");
    const [qBody, setqBody] = useState("");
    const [correct, setCorrect] = useState(false);
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState([]);

    let key = questions.indexOf(k) !== -1 ? questions.indexOf(k) : 0;
    return (
        <div data-step-q className="card" key={key}>
            <div className={`questionCreate${key} questionCreate`}>
                <div style={{ textAlign: "center", margin: "5px" }}>Question {key + 1}</div>
                <div className="questionSection">
                    <div style={{ width: "150px" }}>Question body:</div>
                    <input
                        onChange={(e) => setqBody(e.target.value)}
                        // onClick={(e) => (e.target.value = "What will be the output of the following code?")}
                        type="text"
                        placeholder="What will be the output of the following code?"
                        style={{ width: "400px" }}
                        id={`qBody${key}`}
                        required
                    />
                </div>
                <div>
                    <div className="questionBody">{qBody}</div>
                    <SyntaxHighlighter language={lang} style={dracula} className="highlighterContainer">
                        {codeString ? codeString : ""}
                    </SyntaxHighlighter>

                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                    <div className="typeCode">
                        <textarea
                            required
                            id={`codeBody${key}`}
                            className="hiddenInput"
                            placeholder="Enter your code body here..."
                            onChange={(e) => {
                                e.preventDefault();
                                setCodeString(e.target.value);
                            }}
                        ></textarea>
                    </div>
                </div>
                <div>
                    <Options
                        correct={correct}
                        setCorrect={setCorrect}
                        opt={{
                            option: option,
                            setOption: setOption,
                            setOptions: setOptions,
                            options: options,
                        }}
                    />
                </div>
            </div>
            <div className="btnGroup">
                <button
                    type="button"
                    data-previous-q
                    onClick={(e) => {
                        e.preventDefault();
                        let formSteps = document.querySelectorAll("[data-step-q]");
                        let key = parseInt(
                            e.target.parentElement.parentElement
                                .querySelector(":nth-child(1)")
                                .className.split(" ")[0]
                                .split("e")[3]
                        );
                        console.log(key);
                        if (key <= 0) return;
                        let body = document.getElementById(`qBody${key}`);
                        let code = document.getElementById(`codeBody${key}`);

                        // setqBody()
                        // console.log(body, code);
                        console.log("catch1");
                        formSteps[key].classList.remove("active");
                        key -= 1;
                        console.log("catch2");
                        formSteps[key].classList.add("active");
                    }}
                >
                    Previous
                </button>
                {key + 1 == questions.length ? "a" : "b"}
                {key}
                <button
                    type="button"
                    data-next-q
                    onClick={(e) => {
                        e.preventDefault();
                        let formSteps = document.querySelectorAll("[data-step-q]");
                        let txt = e.target.parentElement.parentElement.querySelector("textarea");
                        let input = e.target.parentElement.parentElement.querySelector("input");

                        //add validation
                        let key = parseInt(
                            e.target.parentElement.parentElement
                                .querySelector(":nth-child(1)")
                                .className.split(" ")[0]
                                .split("e")[3]
                        );

                        let question = {
                            code: codeString,
                            question: qBody,
                            correct: correct,
                            options: options,
                        };
                        let q = questions;
                        q[key] = question;
                        setQuestions(q);
                        if (key + 1 == questions.length) {
                            console.log(e.target.innerHTML);
                            e.target.innerHTML = "Submit";
                            e.target.onclick = (e) => {
                                e.preventDefault();
                                closeModal();
                            };
                            return;
                        }

                        formSteps[key].classList.remove("active");
                        key++;

                        formSteps[key].classList.add("active");

                        // if (txt && !txt.checkValidity()) {
                        //     txt.classList.add("wrongInput");
                        //     txt.placeholder = "Code body required...";
                        // } else if (input && !input.checkValidity()) {
                        //     input.classList.add("wrongInput");
                        //     input.placeholder = "Input needed...";
                        // } else {
                        // console.log(key, questions.length);

                        // let question = { code: codeString, question: qBody };
                        // let questionAll = questions;
                        // questionAll[currentStep] = question;
                        // questionAll[currentStep].correct = correct;
                        // questionAll[currentStep].options = options;
                        // setQ(questionAll);

                        // console.log(questionAll);
                        // console.log(currentStep);

                        // setOptions([]);
                        // setCorrect(false);

                        // formSteps[index + 1].classList.add("active");
                        // input.classList.remove("wrongInput");
                        // txt.classList.remove("wrongInput");
                        // }
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const Options = ({ correct, setCorrect, opt }) => {
    let letters = ["A", "B", "C", "D"];
    const { options, setOptions, option, setOption } = opt;

    useEffect(() => {
        let newOpt = options;
        newOpt[letters.indexOf(option.choice)] = option;
        setOptions(newOpt);
    }, [option]);

    return (
        <>
            <div style={{ display: "flex", gap: "1rem" }}>
                Correct answer:
                {correct ? (
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {correct}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setCorrect(false);
                                let container = e.target.parentElement.parentElement.parentElement;
                                container.querySelector(".correctAnsBg").classList.remove("correctAnsBg");
                            }}
                        >
                            Change
                        </button>
                    </div>
                ) : (
                    "Not set yet"
                )}
            </div>

            {letters.map((letter) => (
                <div className="option" key={letters.indexOf(letter)}>
                    <div key={letter}>Option: {letter}</div>
                    <input
                        type="text"
                        placeholder="Option body"
                        onChange={(e) => {
                            setOption({ choice: letter, answer: e.target.value });
                        }}
                    />
                    {!correct && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setCorrect(letter);
                                e.target.parentElement.querySelector("div").classList.add("correctAnsBg");
                            }}
                        >
                            Set as correct
                        </button>
                    )}
                </div>
            ))}
        </>
    );
};

export default QuestionCreate;
