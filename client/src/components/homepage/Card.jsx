import { useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ quiz }) => {
    let type = quiz.lang;
    let id = quiz.quizid;
    let author = quiz.author;
    Modal.setAppElement(document.getElementById("root"));

    let idString = id.split(quiz.lang.slice(-1))[1];

    const history = useNavigate();

    if (quiz.public)
        return (
            <div className="cardContainer">
                <div className={`homeCard ${type}`}>
                    <div className="title">
                        <div
                            className="quizName"
                            style={{ display: "flex", alignItems: "center", gap: "10px" }}
                        >
                            <i className={`devicon-${type}-plain`}></i>

                            {id}
                        </div>
                        <div>
                            <a href={`/quiz/${type}_${idString}`} className="linkEffect">
                                View more
                            </a>
                            {/* <Link to={`/quiz/${type}_${idString}`}>See more</Link> */}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: ".5rem",
                                marginTop: "1rem",
                            }}
                        >
                            <span style={{ fontSize: "1.5rem" }}>Created by:</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <img
                                    src="https://www.pwshoponline.com/assets/images/avatars/avatar1_big.png"
                                    alt=""
                                    className="smallImage"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history(`/profile/${author.name}`);
                                    }}
                                />
                                <Link to={`/profile/${author.name}`} className="linkEffect">
                                    {author.name}
                                </Link>
                                {/* <span style={{ fontSize: "1.5rem" }}>{author.name}</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="description"></div>
                    <div className="picture"></div>
                    <div className={type}></div>
                </div>
            </div>
        );
};
export default Card;
