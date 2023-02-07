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
    useEffect(() => {
        const createQuizForm = document.querySelector("[data-multi-step-q]");
        const formSteps = [...document.querySelectorAll("[data-step-q]")];

        let currentStep = formSteps.findIndex((step) => step.classList.contains("active"));
        if (currentStep < 0) {
            currentStep = 0;
            formSteps[currentStep].classList.add("active");
        }

        const nextBtns = [...document.querySelectorAll("[data-next-q]")];
        const prvBtns = [...document.querySelectorAll("[data-previous-q]")];
        nextBtns.forEach((nxt) => {
            let parent = nxt.parentElement.parentElement;
            let input =
                parent.querySelector("input") ||
                parent.querySelector("select") ||
                parent.querySelector("#public");
            nxt.onclick = (e) => {
                e.preventDefault();
                if (input && !input.checkValidity()) {
                    input.classList.add("wrongInput");
                    input.placeholder = "Input needed...";
                } else {
                    formSteps[currentStep].classList.remove("active");
                    currentStep++;
                    formSteps[currentStep].classList.add("active");
                    input.classList.remove("wrongInput");
                }
            };
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
        prvBtns.forEach((prv) => {
            prv.onclick = (e) => {
                e.preventDefault();
                formSteps[currentStep].classList.remove("active");
                currentStep--;
                formSteps[currentStep].classList.add("active");
            };
        });
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

    const handleNextQ = (e) => {
        e.preventDefault();
        let index = parseInt(e.target.dataset.index);
        currentQuestions[index] = { code: codeString, question: qBody };
        console.log(currentQuestions);
        setCodeString("");
        setqBody("");
    };

    return (
        <>
            <form data-multi-step-q onSubmit={submitQuiz}>
                {questions.map((question, index) => (
                    <div data-step-q className="card">
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
                                <SyntaxHighlighter language={lang} style={dracula} className="test">
                                    {codeString}
                                </SyntaxHighlighter>
                                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                                <div className="typeCode">
                                    <textarea
                                        className="hiddenInput"
                                        placeholder="Enter your code body here..."
                                        onChange={(e) => {
                                            setCodeString(e.target.value);
                                        }}
                                        style={{
                                            resize: "none",
                                            width: "400px",
                                            height: "100px",
                                            overflow: "visible",
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="btnGroup">
                            <button type="button" data-previous-q>
                                Previous
                            </button>
                            <button type="button" data-next-q onClick={handleNextQ} data-index={index}>
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
