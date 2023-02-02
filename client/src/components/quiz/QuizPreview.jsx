import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchQuiz } from "../../api_helper/user_functions";

const QuizPreview = () => {
    const { id } = useParams();
    let type = id.split("_")[0];
    let idString = id.split("_")[1];
    const [quiz, setQuiz] = useState();

    useEffect(() => {
        async function getAllQuizes() {
            let res = await fetchQuiz(type, idString);
            setQuiz(res.data);
            console.log(res);
        }
        getAllQuizes();
    }, []);

    return (
        <>
            {quiz && (
                <>
                    <div>
                        <div className="info">
                            <div>
                                Quiz created by:{" "}
                                <Link to={`/profile/${quiz.author.name}`}>{quiz.author.name}</Link>
                            </div>
                            <div>Quiz name: {quiz.quizname}</div>
                            <div>Language: {type}</div>
                            <div>Description: {quiz.quizdesc ? quiz.quizdesc : "No description"}</div>
                            <div>Date: {new Date(quiz.date).toISOString()}</div>
                            <div>Publicity: {quiz.public ? "public" : "private"}</div>
                        </div>
                    </div>
                    <div>
                        <Link to={`/quiz/${type}_${idString}/play`}>Start quiz</Link>
                    </div>
                </>
            )}
        </>
    );
};

export default QuizPreview;
