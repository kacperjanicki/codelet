import React, { useState } from "react";
import { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const SingleQuestionCreate = ({ index, questions, setQuestions, lang }) => {
    const [codeString, setCodeString] = useState("");
    const [qBody, setqBody] = useState("");
    //make tab in textareas indent
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
    //make this component multi-step
    const [currentStep, setCurrentStep] = useState(0);
    useEffect(() => {
        // const createQuizForm = document.querySelector("[data-multi-step-q]");
        const formSteps = [...document.querySelectorAll("[data-step-q]")];
        let currentStep = formSteps.findIndex((step) => step.classList.contains("active"));

        if (currentStep < 0) {
            formSteps[0].classList.add("active");
        }

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
        e.preventDefault();
        // console.log(qBody);
        // console.log(codeString);
        // let question = { code: codeString, question: qBody };
        // setQuestions((questions) => [...questions, (questions[index] = question)]);
        console.log(qBody);
        return false;
    };
    let currentQuestions = questions;

    return (
        <>
            <form data-multi-step-q onSubmit={submitQuiz}>
                {questions.map((question, index) => (
                    <div data-step-q className="card" key={index}>
                        <div className={`questionCreate${index} questionCreate`}>
                            <div style={{ textAlign: "center", margin: "5px" }}>Question {index + 1}</div>
                            <div className="questionSection">
                                <div style={{ width: "150px" }}>Question body:</div>
                                <input
                                    onChange={(e) => setqBody(e.target.value)}
                                    onClick={(e) =>
                                        (e.target.value = "What will be the output of the following code?")
                                    }
                                    type="text"
                                    placeholder="What will be the output of the following code?"
                                    style={{ width: "400px" }}
                                    required
                                />
                            </div>
                            <div
                                onClick={() => {
                                    let parent = document.querySelector(`.questionCreate${index}`);
                                    let input = parent.querySelector(".hiddenInput");
                                    input.focus();
                                }}
                            >
                                <div className="questionBody">{qBody}</div>
                                <SyntaxHighlighter
                                    language={lang}
                                    style={dracula}
                                    className="highlighterContainer"
                                >
                                    {codeString ? codeString : ""}
                                </SyntaxHighlighter>
                                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                                <div className="typeCode">
                                    <textarea
                                        className="hiddenInput"
                                        placeholder="Enter your code body here..."
                                        onChange={(e) => {
                                            e.preventDefault();
                                            console.log(e.target.value);
                                            console.log(codeString);
                                            setCodeString(e.target.value);
                                        }}
                                        style={{
                                            resize: "none",
                                            width: "400px",
                                            height: "100px",
                                            overflow: "visible",
                                        }}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="btnGroup">
                            <button
                                type="button"
                                data-previous-q
                                onClick={(e) => {
                                    e.preventDefault();
                                    let formSteps = document.querySelectorAll("[data-step-q]");
                                    if (index == 0) return;
                                    formSteps[index].classList.remove("active");
                                    formSteps[index - 1].classList.add("active");
                                }}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                data-next-q
                                data-index={index}
                                onClick={(e) => {
                                    e.preventDefault();

                                    let formSteps = document.querySelectorAll("[data-step-q]");

                                    let txt = e.target.parentElement.parentElement.querySelector("textarea");
                                    let input = e.target.parentElement.parentElement.querySelector("input");

                                    if (txt && !txt.checkValidity()) {
                                        txt.classList.add("wrongInput");
                                        txt.placeholder = "Code body required...";
                                    } else if (input && !input.checkValidity()) {
                                        input.classList.add("wrongInput");
                                        input.placeholder = "Input needed...";
                                    } else {
                                        formSteps[index].classList.remove("active");
                                        // parent.querySelector(".highlighterContainer").querySelector("span").innerHTML = "";
                                        console.log(codeString);

                                        formSteps[index + 1].classList.add("active");
                                        input.classList.remove("wrongInput");
                                    }
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ))}

                <div data-step-q className="card">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
};

export default SingleQuestionCreate;
