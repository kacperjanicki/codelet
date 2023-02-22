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
                    <div className="previewContainer">
                        <div className="previewBg">
                            <img src="https://nexttechnology.io/app/uploads/2022/01/13.png" alt="" />
                        </div>
                        <div className="info">
                            <div className="previewRight">
                                <div style={{ display: "flex" }}>
                                    <span style={{ fontSize: "2.5rem" }}>{quiz.quizname}</span>
                                </div>
                                <div className="authorPreview">
                                    <Link to={`/profile/${quiz.author.name}`} className="link">
                                        {quiz.author.name}
                                    </Link>

                                    <img
                                        className="profileImage smallImage"
                                        src="https://www.pwshoponline.com/assets/images/avatars/avatar1_big.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="previewSection">
                                <span className="previewTop"> Description:</span>
                                <span> {quiz.quizdesc ? quiz.quizdesc : "No description"}</span>
                            </div>

                            <div className="previewSection">
                                <span className="previewTop"> Language:</span>
                                <span>
                                    <Link style={{ textDecoration: "none" }} to={`/explore?lang=${type}`}>
                                        {type}
                                    </Link>
                                </span>
                            </div>
                            <div className="previewSection">
                                <span className="previewTop"> Date:</span>
                                <span>{new Date(quiz.date).toISOString()}</span>
                            </div>
                            <div className="previewRight">
                                <div className="previewSection">
                                    <span className="previewTop"> Publicity:</span>
                                    <span>{quiz.public ? "Public" : "Private"}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Link to={`/quiz/${type}_${idString}/play`}>Start quiz</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default QuizPreview;
