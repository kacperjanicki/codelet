import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Preview = ({ questions, setQuestions }) => {
    // useEffect(() => {
    //     setQuestions([
    //         {
    //             code: "body1",
    //             question: "q1",
    //             correct: "B",
    //             options: [
    //                 {
    //                     choice: "A",
    //                     answer: "a",
    //                 },
    //                 {
    //                     choice: "B",
    //                     answer: "b",
    //                 },
    //                 {
    //                     choice: "C",
    //                     answer: "c",
    //                 },
    //                 {
    //                     choice: "D",
    //                     answer: "d",
    //                 },
    //             ],
    //         },
    //     ]);
    // }, []);

    return (
        <div className="previewContainer">
            {questions.map((q) => (
                <Question key={q.code} questions={questions} data={q} setQuestions={setQuestions} />
            ))}
        </div>
    );
};

const Question = ({ questions, data, setQuestions }) => {
    let key = questions.indexOf(data);

    console.log(data, key);

    const [codeString, setCodeString] = useState(data.code);
    const [questionPrompt, setQuestionPrompt] = useState(data.question);

    useEffect(() => {
        let q = questions;
        q[key].code = codeString;
        q[key].question = questionPrompt;
        setQuestions(q);
        console.log(questions);
    }, [codeString, questionPrompt]);

    let lang = "python";
    // useEffect(() => {
    //     let textarea = document.getElementById(`codeBody${key}`);
    //     // textarea.innerHTML = data.code;

    //     console.log(textarea);
    // }, []);

    const changeCorrect = () => {
        // change top text to `choose correct answer for your question`
        // when button gets clicked, handle recording it in a state
    };

    return (
        <div className="previewQuestion">
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
                <span style={{ fontSize: ".9rem", marginTop: "10px" }}>
                    {data.correct} is set to be a correct answer
                </span>
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
            <button className={`option-btn ${choice == correct && "correct"}`}>{answer}</button>
            {choice == correct && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCorrectChange();
                    }}
                >
                    Change
                </button>
            )}
        </div>
    );
};

export default Preview;
