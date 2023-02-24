import React, { useState } from "react";
import Modal from "react-modal";
import { CodeBlock } from "react-code-blocks";
import { atomOneDark } from "react-code-blocks";
import { useEffect } from "react";
import { changeQuizPrivacy } from "../../api_helper/user_functions";
import { quizContext } from "./Quiz";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const GameRaport = ({ data, personalContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    Modal.setAppElement(document.getElementById("root"));

    let questions = data.questions.questions;
    let callback;
    if (data.callback) {
        callback = data.callback.callback;
    }

    console.log(data);
    const [publicityString, setPublicityString] = useState("");
    const changePrivacy = async (privacy) => {
        let res;
        switch (privacy) {
            case "public":
                res = await changeQuizPrivacy("public", data.id);
                break;
            case "private":
                res = await changeQuizPrivacy("private", data.id);
                break;
        }
        if (res.ok) {
            setPublicityString(res.callback);
        }
    };
    useEffect(() => {
        setPublicityString(
            data.public ? "Everyone can see this game raport" : "Only you can see this game raport"
        );
    }, []);
    console.log(data);

    return (
        <>
            {personalContent || (!personalContent && data.public) ? (
                <div key={data.id} className="gameLogCard">
                    <span>
                        <Link to={`/quiz/${data.quizdata.quizid}`}>{data.quizdata.quizname}</Link>
                        by {data.quizdata.author.name}
                    </span>
                    <span style={{ fontSize: "1.5rem" }}>
                        Quiz played at <Moment date={data.date.toLocaleString()} format="DD/MM/YYYY"></Moment>
                    </span>
                    <div>
                        Score: {data.score}/{data.callback.callback.length}
                    </div>
                    <div>
                        {personalContent && (
                            <div className="changePublic">
                                <div>{publicityString}</div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    Change game raport publicity:
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            changePrivacy("private");
                                        }}
                                    >
                                        Private
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            changePrivacy("public");
                                        }}
                                    >
                                        Public
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {personalContent || (!personalContent && data.public) ? (
                        <>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <button onClick={openModal} style={{ width: "200px" }}>
                                    View Game report
                                </button>
                            </div>
                            <Modal
                                isOpen={isOpen}
                                onRequestClose={closeModal}
                                contentLabel="Example Modal"
                                overlayClassName={"Overlay"}
                                className={"Modal"}
                            >
                                {questions.map((question) => (
                                    <SingleQuestion
                                        question={question}
                                        questionArr={questions}
                                        callback={callback[questions.indexOf(question)]}
                                        key={questions.indexOf(question)}
                                    />
                                ))}
                            </Modal>
                        </>
                    ) : null}
                </div>
            ) : null}
        </>
    );
};

const SingleQuestion = ({ question, questionArr, callback }) => {
    let questionId = questionArr.indexOf(question);
    const [selected, setSelected] = useState();

    let correct = questionArr[questionArr.indexOf(question)].correct;
    let isCorrect = correct == selected;
    let omitted = callback.answerGiven == false;

    console.log(callback);

    console.log(callback.answerGiven);

    const [indicationStr, setIndicationStr] = useState("");

    useEffect(() => {
        setIndicationStr("");
        let questionDiv = document.getElementById(questionId);
        let btns = questionDiv.querySelectorAll(".option-btn");

        btns.forEach((btn) => {
            if (btn.id == callback.answerGiven) {
                setSelected(btn.id);
                btn.classList.add("answerGiven");
            }
            if (btn.id == correct) {
                btn.classList.add("correct");
            }
        });
        let numStr = questionDiv.querySelector(`.questionNum${questionDiv.id}`);
        if (omitted) {
            numStr.style = "color:grey;";
            setIndicationStr("You omitted this question");
        } else {
            if (!isCorrect && !omitted) {
                numStr.style = "color:red;";
            } else if (isCorrect) {
                numStr.style = "color:green;";
            }
        }
    }, []);

    return (
        <div id={questionId}>
            <div className={`questionNum${questionId}`}>
                Question {questionId + 1} {indicationStr}
            </div>
            <div>Question prompt: {question.question}</div>
            <div>You answered: {callback.answerGiven}</div>
            <div>Correct answer: {correct}</div>
            <div>
                <CodeBlock
                    text={question.code}
                    language="python"
                    showLineNumbers={true}
                    theme={atomOneDark}
                    customStyle={{ borderRadius: ".5rem", textAlign: "left" }}
                ></CodeBlock>
            </div>
            <div className="options">
                {question.options.map((option) => (
                    <div className="option" key={question.options.indexOf(option)}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button className="option-btn defaultOption" id={option.choice}>
                                {option.choice}: {option.answer}
                            </button>
                            {option.choice == correct && selected == option.choice && "You got it right"}
                            {option.choice == correct && selected != option.choice && "Correct answer"}
                            {option.choice != correct && selected == option.choice && "You got it wrong"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameRaport;
