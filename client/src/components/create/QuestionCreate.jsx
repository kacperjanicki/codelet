import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

const QuestionCreate = ({ howMany, questions, setQuestions, lang, close }) => {
    console.log(questions);
    const [q, setQ] = useState([]);
    tabsInTxt();

    //make this component multi-step
    useEffect(() => {
        const createQuizForm = document.querySelector("[data-multi-step-q]");
        console.log(createQuizForm);
        let formSteps = createQuizForm.querySelectorAll("[data-step-q]");
        console.log(formSteps);
        if (formSteps) {
            formSteps[0].classList.add("active"); //make first form card visible by default

            console.log(formSteps);
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
            input.addEventListener("keydown", (e) => {
                if (e.keyCode === 13) {
                    let btn = parent.querySelector(".btnGroup").querySelector("[data-next-q]");
                    if (input.name == "select") {
                        input.click();
                    } else if (input.name !== "description") {
                        btn.click();
                    }
                    // btn.click();
                }
            });
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
        // setQuestions([...q]);
        close();
        e.preventDefault();
        return false;
    };

    // useEffect(() => {
    //     let newOpt = options;
    //     newOpt[letters.indexOf(option.choice)] = option;
    //     setOptions(newOpt);
    // }, [option]);

    // useEffect(() => {
    //     setQ([...q]);
    // }, [options]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        console.log(currentStep, questions.length);
    }, [currentStep]);

    console.log(questions);

    questions.map((q) => {
        console.log(q);
    });

    return (
        <questionCreateContext.Provider value={{ lang, currentStep, setCurrentStep, questions }}>
            <form data-multi-step-q onSubmit={submitQuiz}>
                {questions.map((q) => (
                    <SingleQuestion k={q} />
                ))}
                <button>Submit</button>
            </form>
        </questionCreateContext.Provider>
    );
};

const SingleQuestion = ({ k }) => {
    const { lang, currentStep, setCurrentStep, questions } = useContext(questionCreateContext);
    const [codeString, setCodeString] = useState("");
    const [qBody, setqBody] = useState("");
    const [correct, setCorrect] = useState(false);

    let key = questions.indexOf(k);
    console.log(k);
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
                        required
                    />
                </div>
                <div
                    onClick={() => {
                        // let parent = document.querySelector(`.questionCreate${index}`);
                        // let input = parent.querySelector(".hiddenInput");
                        // input.focus();
                    }}
                >
                    <div className="questionBody">{qBody}</div>
                    <SyntaxHighlighter language={lang} style={dracula} className="highlighterContainer">
                        {codeString ? codeString : ""}
                    </SyntaxHighlighter>

                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                    <div className="typeCode">
                        <textarea
                            className="hiddenInput"
                            placeholder="Enter your code body here..."
                            onChange={(e) => {
                                e.preventDefault();
                                setCodeString(e.target.value);
                            }}
                            required
                        ></textarea>
                    </div>
                </div>
                <div>
                    <Options correct={correct} setCorrect={setCorrect} />
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
                        if (key == 0) return;
                        formSteps[key].classList.remove("active");
                        key--;
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
                    data-index={currentStep}
                    onClick={(e) => {
                        e.preventDefault();
                        let formSteps = document.querySelectorAll("[data-step-q]");

                        let txt = e.target.parentElement.parentElement.querySelector("textarea");
                        let input = e.target.parentElement.parentElement.querySelector("input");

                        // if (txt && !txt.checkValidity()) {
                        //     txt.classList.add("wrongInput");
                        //     txt.placeholder = "Code body required...";
                        // } else if (input && !input.checkValidity()) {
                        //     input.classList.add("wrongInput");
                        //     input.placeholder = "Input needed...";
                        // } else {
                        // console.log(key, questions.length);
                        let key = parseInt(
                            e.target.parentElement.parentElement
                                .querySelector(":nth-child(1)")
                                .className.split(" ")[0]
                                .split("e")[3]
                        );
                        console.log(key);

                        if (key + 1 == questions.length) return;
                        formSteps[key].classList.remove("active");
                        key++;

                        formSteps[key].classList.add("active");

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

const Options = ({ correct, setCorrect }) => {
    let letters = ["A", "B", "C", "D"];
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState([]);

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
                <div className="option">
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
