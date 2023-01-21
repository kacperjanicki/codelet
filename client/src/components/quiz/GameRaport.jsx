import React, { useState } from "react";
import Modal from "react-modal";
import { CodeBlock } from "react-code-blocks";
import { atomOneDark } from "react-code-blocks";
import { useEffect } from "react";

const GameRaport = ({ data, key }) => {
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

    return (
        <div key={data.id} className="gameLogCard">
            <div>Quiz played at {data.date.toLocaleString()}</div>
            <div>Score: {data.score}</div>
            <button onClick={openModal}>View Game report</button>
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
                    />
                ))}
            </Modal>
        </div>
    );
};

const SingleQuestion = ({ question, questionArr, callback }) => {
    let questionId = questionArr.indexOf(question);
    // console.log(callback);
    const [selected, setSelected] = useState();
    const [wrong, setWrong] = useState();

    let correct = questionArr[questionArr.indexOf(question)].correct;
    let isCorrect = correct == selected;
    let isOmitted = !selected;

    const [indicationStr, setIndicationStr] = useState("");
    console.log(isOmitted);

    // console.log(correct);

    useEffect(() => {
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
        if (isOmitted) {
            numStr.style = "color:grey;";
            setIndicationStr("You omitted this question");
        } else {
            if (!isCorrect && !isOmitted) {
                numStr.style = "color:red;";
            } else if (isCorrect) {
                numStr.style = "color:green;";
            }
            setIndicationStr("");
        }

        // console.log(callback);
    }, []);

    // callback.map((call) => {});

    return (
        <div id={questionId}>
            <div className={`questionNum${questionId}`}>
                Question {questionId + 1} {indicationStr}
            </div>
            <div>{question.question}</div>
            <div>You answered: {callback.answerGiven}</div>
            <div>Correct answer: {correct}</div>
            {`${isCorrect}`}
            <div>
                <CodeBlock
                    text={question.code}
                    language="python"
                    showLineNumbers={true}
                    theme={atomOneDark}
                    customStyle={{ borderRadius: ".5rem", textAlign: "left" }}
                ></CodeBlock>
            </div>
            {question.options.map((option) => (
                <div className="option" key={option.choice}>
                    <button className="option-btn defaultOption" id={option.choice}>
                        {option.choice}: {option.answer}
                    </button>
                    {option.choice == correct && selected == option.choice && "You got it right"}
                    {option.choice == correct && selected != option.choice && "Correct answer"}
                    {option.choice != correct && selected == option.choice && "You got it wrong"}
                    {/* {option.choice == selected && "You selected"} */}
                </div>
            ))}
        </div>
    );
};

export default GameRaport;
