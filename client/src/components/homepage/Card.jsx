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
                        <a href={`/quiz/${type}_${idString}`}>View more</a>
                        {/* <Link to={`/quiz/${type}_${idString}`}>See more</Link> */}
                    </div>

                    <div className="info">Created by: {author.name}</div>
                </div>
                <div className="description"></div>
                <div className="picture"></div>
            </div>
        );
};
export default Card;
