import React from "react";
import "./homepage.css";
import { quizesAvailable } from "../../api_helper/user_functions";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

const Homepage = () => {
    let availableQuizes = false;
    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        async function getAllQuizes() {
            let res = await quizesAvailable();
            setQuizes(res.quizList);
            // console.log(res);
        }
        getAllQuizes();
    }, []);

    // getAuthorById(quiz.author_id);

    return (
        <div className="homePage">
            <div className="homeBlock">
                <div className="header">All quizes</div>
                <div className="cardsContainer">
                    {quizes && quizes.map((quiz) => <Card key={quiz.quizid} quiz={quiz} />)}
                </div>
            </div>
            <div className="homeBlock">
                <div className="header">Explore more</div>
                <div className="cardsContainer"></div>
            </div>
        </div>
    );
};

export default Homepage;
