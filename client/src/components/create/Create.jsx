import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { createNewQuiz, createQuizId } from "../../api_helper/user_functions";
import { UserContext } from "../../App";
import "./createNewQuiz.css";
import "./script.js";
import SingleQuestionCreate from "./SingleQuestionCreate";

const Create = () => {
    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    let context = useContext(UserContext);
    let userLoggedIn = context.userObj ? true : false;

    Modal.setAppElement(document.getElementById("root"));

    const navigate = useNavigate();

    return (
        <>
            <div>
                <h5>Welcome!</h5>
                Here you can contribute to our community and create your own quizes!
            </div>
            <button onClick={openModal} disabled={!userLoggedIn}>
                Create a new Quiz
            </button>
            {!userLoggedIn && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                    }}
                >
                    Log in
                </button>
            )}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName={"Overlay"}
                className={"Modal"}
            >
                <AnimatedForm />
            </Modal>
        </>
    );
};

const AnimatedForm = () => {
    const [quizName, setQuizName] = useState();
    const [quizDesc, setQuizDesc] = useState();
    const [lang, setLang] = useState();
    const [publicity, setPublicity] = useState();
    const [id, setId] = useState();
    const [questions, setQuestions] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function generateQuizId() {
            if (!lang) return;
            let res = await createQuizId(lang);
            if (res.ok) {
                setId(res.data.id);
            }
            console.log(res);
        }
        generateQuizId();

        // console.log(lang);
    }, [lang]);

    let context = useContext(UserContext);

    let author_id = context.userObj.user_id;

    const submitQuiz = () => {
        let questions = {
            questions: [
                { code: "?", correct: "?", options: [{ answer: "?", choice: "A" }], question: "question" },
            ],
        };
        createNewQuiz(author_id, quizName, lang, quizDesc, questions, id);
        return false;
    };

    useEffect(() => {
        const createQuizForm = document.querySelector("[data-multi-step]");
        const formSteps = [...document.querySelectorAll("[data-step]")];

        let currentStep = formSteps.findIndex((step) => step.classList.contains("active"));
        if (currentStep < 0) {
            currentStep = 0;
            formSteps[currentStep].classList.add("active");
        }

        const nextBtns = [...document.querySelectorAll("[data-next]")];
        const prvBtns = [...document.querySelectorAll("[data-previous]")];
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
                console.log(e.keyCode);
                if (e.keyCode === 13) {
                    let btn = parent.querySelector(".btnGroup").querySelector("[data-next]");
                    console.log(btn);
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

    // creating questions logic
    const [isOpen, setIsOpen] = useState(false);
    const [howMany, setHowMany] = useState(0);
    const [questionsCreated, setQuestionsCreated] = useState([]);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        if (howMany > 0) setQuestionsCreated(Array(howMany).fill("_"));
        else setQuestionsCreated(Array(0).fill("_"));
    }, [howMany]);

    return (
        <>
            <form data-multi-step onSubmit={submitQuiz}>
                <div data-step className="card">
                    <label htmlFor="quizName">Quiz Name</label>
                    <input
                        type="text"
                        name="quizName"
                        onChange={(e) => {
                            e.preventDefault();
                            setQuizName(e.target.value);
                        }}
                        required
                    />
                    <div className="btnGroup">
                        <button type="button" data-next>
                            Next
                        </button>
                    </div>
                </div>
                <div data-step className="card">
                    <label htmlFor="lang">Programming Language</label>
                    <select
                        id="langs"
                        name="select"
                        required
                        onChange={(e) => {
                            e.preventDefault();
                            if (e.target.value) setLang(e.target.value);
                            // setLang(e.target.value);
                        }}
                    >
                        <option></option>
                        <option value="python">Python</option>
                        <option value="javascript">Javascript</option>
                    </select>
                    <div className="btnGroup">
                        <button type="button" data-previous>
                            Previous
                        </button>
                        <button type="button" data-next>
                            Next
                        </button>
                    </div>
                </div>
                <div data-step className="card description">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        cols="30"
                        rows="10"
                        maxLength={255}
                        style={{ resize: "none" }}
                        onChange={(e) => {
                            e.preventDefault();
                            setQuizDesc(e.target.value);
                        }}
                    ></textarea>
                    <div className="btnGroup">
                        <button type="button" data-previous>
                            Previous
                        </button>
                        <button type="button" data-next>
                            Next
                        </button>
                    </div>
                </div>
                <div data-step className="card">
                    <label htmlFor="questions">Questions</label>
                    <label htmlFor="howMany">How many questions?</label>
                    <input
                        type="number"
                        name="howMany"
                        style={{ width: "50px" }}
                        min="1"
                        max="10"
                        required
                        onChange={(e) => {
                            e.preventDefault();
                            setHowMany(parseInt(e.target.value));
                            console.log(e.target.checkValidity());
                            if (!e.target.checkValidity()) e.target.classList.add("wrongInput");
                            else if (e.target.checkValidity()) e.target.classList.remove("wrongInput");
                        }}
                    />
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName={"Overlay"}
                        className={"Modal"}
                    >
                        {questionsCreated.map((question, number) => (
                            <SingleQuestionCreate
                                index={number}
                                questions={questionsCreated}
                                setQuestions={setQuestionsCreated}
                            />
                        ))}
                    </Modal>
                    <div className="btnGroup">
                        <button type="button" data-previous>
                            Previous
                        </button>
                        <button type="button" onClick={openModal}>
                            Next
                        </button>
                    </div>
                </div>
                <div data-step className="card">
                    <label htmlFor="questions">Publicity</label>
                    <label htmlFor="howMany">Who should see your quiz?</label>
                    <select
                        id="public"
                        name="select"
                        required
                        onChange={(e) => {
                            e.preventDefault();
                            if (e.target.value) setPublicity(e.target.value);
                        }}
                    >
                        <option></option>
                        <option value={true}>Everyone</option>
                        <option value={false}>Only me</option>
                    </select>

                    <div className="btnGroup">
                        <button type="button" data-previous>
                            Previous
                        </button>
                        <button type="button" data-next>
                            Next
                        </button>
                    </div>
                </div>
                <div data-step className="card">
                    <div className="formGroup">
                        <Summary
                            quizDesc={quizDesc}
                            quizName={quizName}
                            id={id}
                            lang={lang}
                            publicity={publicity}
                        />
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
            <div className="card active summary">
                <div className="formGroup">
                    <div style={{ textAlign: "center", fontWeight: "bold" }}>Quiz preview</div>
                    <Summary
                        quizDesc={quizDesc}
                        quizName={quizName}
                        id={id}
                        lang={lang}
                        publicity={publicity}
                    />
                </div>
            </div>
        </>
    );
};

const Summary = ({ lang, id, quizName, quizDesc, publicity }) => {
    return (
        <div style={{ display: "flex", gap: ".5rem", flexDirection: "column" }}>
            {quizName && (
                <div className="summary-row">
                    <div className="bold">Quiz name:</div>
                    <div>{quizName}</div>
                </div>
            )}
            {quizDesc && (
                <div className="summary-row summary-description">
                    <div className="bold">Quiz description:</div>
                    <div>{quizDesc}</div>
                </div>
            )}
            {lang && (
                <div className="summary-row ">
                    <div className="bold">Quiz language:</div>
                    <div>{lang}</div>
                </div>
            )}
            {publicity && (
                <div className="summary-row ">
                    <div className="bold">Quiz publicity:</div>
                    <div>{publicity ? "public" : "private"}</div>
                </div>
            )}
            <div>
                {lang && id ? (
                    <div className="summary-row">
                        <div className="bold">Quiz id:</div>
                        <div>
                            {lang}
                            {id}
                        </div>
                    </div>
                ) : (
                    <div className="summary-row">
                        <div className="bold">Quiz id:</div>
                        <div className="cursive">Select a language</div>
                    </div>
                )}
            </div>
            {lang && id && (
                <span className="cursive">
                    Your quiz will be available at codelet.com/quiz/{lang}/{id}
                </span>
            )}
        </div>
    );
};

export default Create;
