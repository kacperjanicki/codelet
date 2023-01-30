import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { quizesAvailable } from "../../api_helper/user_functions";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";

const Homepage = () => {
    let availableQuizes = false;
    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        async function getAllQuizes() {
            let res = await quizesAvailable();
            setQuizes(res.quizList);
            console.log(res);
        }
        getAllQuizes();
    }, []);

    // getAuthorById(quiz.author_id);

    return (
        <div className="homePage">
            <div className="homeBlock">
                <div className="header">All quizes</div>
                <div className="cardsContainer">
                    {quizes &&
                        quizes.map((quiz) => (
                            <Card id={quiz.quizid} author={quiz.author} key={quiz.quizid} quiz={quiz} />
                        ))}
                </div>
            </div>
            <div className="homeBlock">
                <div className="header">Explore more</div>
                <div className="cardsContainer"></div>
            </div>
        </div>
    );
};

const Card = ({ type, id, author, quiz }) => {
    console.log(quiz);
    type = quiz.lang;

    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    Modal.setAppElement(document.getElementById("root"));

    let idString = id.split(quiz.lang.slice(-1))[1];

    if (quiz.public)
        return (
            <div className="homeCard">
                <div className="title">
                    {id}
                    <div>
                        <Link to={`/quiz/${type}/${idString}`}>Start quiz</Link>
                    </div>
                    <div>
                        <button onClick={openModal}>View more</button>
                        <Modal
                            isOpen={isOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            overlayClassName={"Overlay"}
                            className={"small Modal"}
                        >
                            <div className="info">
                                <div>
                                    Quiz created by: <Link to={`/profile/${author.name}`}>{author.name}</Link>
                                </div>
                                <div>Quiz name: {quiz.quizname}</div>
                                <div>Language: {type}</div>
                                <div>Description: {quiz.quizdesc ? quiz.quizdesc : "No description"}</div>
                                <div>Date: {new Date(quiz.date).toISOString()}</div>
                                <div>Publicity: {quiz.public ? "public" : "private"}</div>
                            </div>
                            <Link to={`/quiz/${type}/${idString}`}>Play</Link>
                        </Modal>
                    </div>
                    <div className="info">Created by: {author.name}</div>
                </div>
                <div className="description"></div>
                <div className="picture"></div>
            </div>
        );
};

export default Homepage;
