import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div className="homePage">
            <div className="homeBlock">
                <div className="header">Quizes for you:</div>
                <div className="cardsContainer">
                    <Card type="python" id="001" />
                    <Card type="python" id="001" />
                    <Card type="python" id="001" />
                </div>
            </div>
            <div className="homeBlock">
                <div className="header">Explore more</div>
                <div className="cardsContainer">
                    <Card type="python" id="001" />
                    <Card type="python" id="001" />
                    <Card type="python" id="001" />
                </div>
            </div>
        </div>
    );
};

const Card = ({ type, id }) => {
    // fetchQuiz(type, id);

    return (
        <div className="homeCard">
            <div className="title">
                {type}
                {id}
                <div>
                    <Link to={`/quiz/${type}${id}`}>Start quiz</Link>
                </div>
            </div>
            <div className="description"></div>
            <div className="picture"></div>
        </div>
    );
};

export default Homepage;
