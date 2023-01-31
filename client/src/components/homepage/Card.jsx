import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const Card = ({ quiz }) => {
    console.log(quiz);
    let type = quiz.lang;
    let id = quiz.quizid;
    let author = quiz.author;

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
export default Card;
