import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Preview = ({ questions, setQuestions, close }) => {
    return (
        <div>
            <div className="previewContainer">
                {questions.map((q) => (
                    <div className="previewSection">
                        <Question key={q.code} questions={questions} data={q} setQuestions={setQuestions} />
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", margin: "10px", justifyContent: "center" }}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        close();
                        // add `x changes applied alert in top right corner`
                    }}
                >
                    Confirm changes
                </button>
            </div>
        </div>
    );
};

const Question = ({ questions, data, setQuestions }) => {
    let key = questions.indexOf(data);

    console.log(data, key);

    const [codeString, setCodeString] = useState(data.code);
    const [questionPrompt, setQuestionPrompt] = useState(data.question);
    const [correct, setCorrect] = useState(data.correct);
    const [correctStr, setCorrectStr] = useState(`${data.correct} is set to be a correct answer`);

    useEffect(() => {
        let q = questions;
        q[key].code = codeString;
        q[key].question = questionPrompt;
        q[key].correct = correct;
        setQuestions(q);
        console.log(questions);
    }, [codeString, questionPrompt, correct]);

    let lang = "python";
    // useEffect(() => {
    //     let textarea = document.getElementById(`codeBody${key}`);
    //     // textarea.innerHTML = data.code;

    //     console.log(textarea);
    // }, []);

    const changeCorrect = () => {
        let parent = document.getElementById("preview" + key);
        // change top text to `choose correct answer for your question`
        setCorrectStr("Choose a correct answer");
        // hide change btn
        let changeBtn = document.getElementById("changeBtn");
        changeBtn.classList.add("hidden");
        // make all btns gray but slightly lighter, remove current correct answer indication
        let btns = parent.querySelectorAll(".option-btn");
        btns.forEach((btn) => {
            btn.classList = "option-btn changeCorrect";
            // when button gets clicked, handle recording it in a state
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                setCorrect(e.target.value.toUpperCase());
                setCorrectStr(`${correct} is set to be a correct answer`);
                // make btns like initial state
                btns.forEach((btn) => btn.classList.remove("changeCorrect", "correct"));

                btn.classList = "option-btn correct";
                changeBtn.classList.remove("hidden");
            });
            // btn.onClick = (e) => {
            //     e.preventDefault();
            //     console.log("a");
            //     // setCorrect(e.target.innerHTML)
            //     console.log(e.target.innerHTML);
            // };
        });
    };

    return (
        <div className="previewQuestion" id={`preview${key}`}>
            <div>
                <div className="questionBody">
                    Question:{" "}
                    <input
                        type="text"
                        defaultValue={data.question}
                        onChange={(e) => {
                            e.preventDefault();
                            setQuestionPrompt(e.target.value);
                        }}
                    />
                </div>
                <div className="codeContainer">
                    <SyntaxHighlighter language={lang} style={dracula} className="highlighterContainer">
                        {codeString ? codeString : ""}
                    </SyntaxHighlighter>
                </div>

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
                        defaultValue={codeString}
                    ></textarea>
                </div>
            </div>
            <div className="options">
                <span style={{ fontSize: ".9rem", marginTop: "10px" }} id="correctIndicator">
                    {correctStr}
                </span>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        changeCorrect();
                    }}
                    id="changeBtn"
                >
                    Change
                </button>
                {data.options.map((op) => (
                    <Option
                        key={op.choice}
                        choice={op.choice}
                        answer={op.answer}
                        correct={data.correct}
                        handleCorrectChange={changeCorrect}
                    />
                ))}
            </div>
        </div>
    );
};

const Option = ({ choice, answer, correct, handleCorrectChange }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
            {choice}
            <button className={`option-btn ${choice == correct && "correct"}`} value={answer}>
                {answer}
            </button>
        </div>
    );
};

export default Preview;
