import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Preview = () => {
    let questions = [
        {
            code: "body1",
            question: "q1",
            correct: "B",
            options: [
                {
                    choice: "A",
                    answer: "a",
                },
                {
                    choice: "B",
                    answer: "b",
                },
                {
                    choice: "C",
                    answer: "c",
                },
                {
                    choice: "D",
                    answer: "d",
                },
            ],
        },
        {
            code: "b2",
            question: "q2",
            correct: "C",
            options: [
                {
                    choice: "A",
                    answer: "x",
                },
                {
                    choice: "B",
                    answer: "d",
                },
                {
                    choice: "C",
                    answer: "d",
                },
                {
                    choice: "D",
                    answer: "x",
                },
            ],
        },
    ];
    return (
        <div className="previewContainer">
            {questions.map((q) => (
                <Question key={q.code} questions={questions} data={q} />
            ))}
        </div>
    );
};

const Question = ({ questions, data }) => {
    let key = questions.indexOf(data);
    console.log(data);
    const [codeString, setCodeString] = useState("for i in range(10);\nprint('test');");
    let lang = "python";
    // useEffect(() => {
    //     let textarea = document.getElementById(`codeBody${key}`);
    //     // textarea.innerHTML = data.code;

    //     console.log(textarea);
    // }, []);

    return (
        <div className="previewQuestion">
            <div>
                <div className="questionBody">{data.question}</div>
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
                    <Option key={op.choice} choice={op.choice} answer={op.answer} correct={data.correct} />
                ))}
            </div>
        </div>
    );
};

const Option = ({ choice, answer, correct }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
            {choice}
            <button className={`option-btn ${choice == correct && "correct"}`}>{answer}</button>
            {choice == correct && <button>Change</button>}
        </div>
    );
};

export default Preview;
