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
                            <Card
                                type={quiz.lang}
                                id={quiz.quizid}
                                author={quiz.author_id}
                                key={quiz.quizid}
                            />
                        ))}
                </div>
            </div>
            <div className="homeBlock">
                <div className="header">Explore more</div>
                <div className="cardsContainer">
                    <Card type="python" id="python001" />
                    <Card type="python" id="python001" />
                    <Card type="python" id="python001" />
                </div>
            </div>
        </div>
    );
};

const Card = ({ type, id, author }) => {
    // fetchQuiz(type, id);
    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    Modal.setAppElement(document.getElementById("root"));

    let idString = id.split(type.slice(-1))[1];

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
                        className={"Modal"}
                    >
                        <Link to={`/quiz/${type}/${idString}`}>Start quiz</Link>
                    </Modal>
                </div>
                <div className="info">Created by: {author}</div>
            </div>
            <div className="description"></div>
            <div className="picture"></div>
        </div>
    );
};

export default Homepage;
