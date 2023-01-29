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

const Create = () => {
    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    Modal.setAppElement(document.getElementById("root"));

    return (
        <>
            <div>
                <h5>Welcome!</h5>
                Here you can contribute to our community and create your own quizes!
            </div>
            <button onClick={openModal}>Create a new Quiz</button>
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
    }, [lang]);

    let context = useContext(UserContext);

    let author_id = context.userObj.user_id;

    const submitQuiz = () => {
        console.log(quizName, quizDesc, lang);
        let questions = {
            questions: [
                { code: "?", correct: "?", options: [{ answer: "?", choice: "A" }], question: "question" },
            ],
        };

        createNewQuiz(author_id, quizName, lang, quizDesc, questions, id);
        // navigate("/test");

        //  { "questions": [{"code":"?",
        // "correct":"?","options":
        // [{"answer":"code","choice":"A"}, ... ]
        // "question":"pytanie"
        //  }]}
        return false;
    };

    return (
        <form data-multi-step>
            <div data-step="1" className="card">
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
                    <button type="button">Next</button>
                </div>
            </div>
            <div data-step="2" className="card description">
                <label htmlFor="lang">Programming Language</label>
                <select
                    id="langs"
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
                    <button type="button">Previous</button>
                    <button type="button">Next</button>
                </div>
            </div>
            <div data-step="3" className="card description">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    cols="30"
                    rows="10"
                    style={{ resize: "none" }}
                    onChange={(e) => {
                        e.preventDefault();
                        setQuizDesc(e.target.value);
                    }}
                    required
                ></textarea>
                <div className="btnGroup">
                    <button type="button">Previous</button>
                    <button type="button">Next</button>
                </div>
            </div>
            <div data-step="4" className="card">
                <label htmlFor="questions">Questions</label>
                <label htmlFor="howMany">How many questions?</label>
                <input type="number" name="howMany" style={{ width: "50px" }} min={1} max={10} />

                <div className="btnGroup">
                    <button type="button">Previous</button>
                    <button type="button">Next</button>
                </div>
            </div>
            <div data-step="5" className="card">
                <div className="formGroup">
                    <div>
                        {lang && id ? (
                            <div>
                                <span>
                                    Quiz id: {lang}
                                    {id}
                                </span>
                                <span className="cursive">
                                    Your quiz will be available at codelet.com/quiz/{lang}/{id}
                                </span>
                            </div>
                        ) : (
                            <>
                                <span>Quiz id:</span>
                                <span className="cursive">Select a language</span>
                            </>
                        )}
                    </div>
                    <div>Quiz name: {quizName}</div>
                    <div>Quiz description: {quizDesc}</div>
                    <div>Quiz language: {lang ? lang : <span className="cursive">Not selected</span>}</div>
                    <div className="btnGroup">
                        <button>Previous</button>
                        <button type="submit" onClick={submitQuiz}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Create;
