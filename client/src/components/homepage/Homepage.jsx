import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { quizesAvailable } from "../../api_helper/user_functions";
import { useEffect } from "react";
import { useState } from "react";

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

    console.log(quizes);

    return (
        <div className="homePage">
            <div className="homeBlock">
                <div className="header">All quizes</div>
                <div className="cardsContainer">
                    {quizes && quizes.map((quiz) => <Card type={quiz.lang} id={quiz.no} />)}
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
                    <Link to={`/quiz/${type}/${id}`}>Start quiz</Link>
                </div>
            </div>
            <div className="description"></div>
            <div className="picture"></div>
        </div>
    );
};

export default Homepage;
