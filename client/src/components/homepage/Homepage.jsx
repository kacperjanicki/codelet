import React from "react";
import "./homepage.css";
import { quizesAvailable, getAllUsers } from "../../api_helper/user_functions";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";
import User from "./User";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    let availableQuizes = false;
    const [quizes, setQuizes] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getAllQuizes() {
            let res = await quizesAvailable();
            setQuizes(res.quizList);
            // console.log(res);
        }
        async function getallUsers() {
            let res = await getAllUsers();
            setUsers(res);
            // setUsers(res)
        }
        getallUsers();
        getAllQuizes();
    }, []);
    const navigate = useNavigate();

    // getAuthorById(quiz.author_id);

    return (
        <div className="homePage">
            <div className="homeBlock">
                <div className="header">
                    <div className="headerAll">
                        <div>All quizes</div>
                        <div
                            style={{ display: "flex", alignItems: "center", gap: "10px" }}
                            className="linkEffect"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/create");
                            }}
                        >
                            Create <AiOutlinePlus />
                        </div>
                    </div>
                </div>
                <div className="cardsContainer">
                    {quizes && quizes.map((quiz) => <Card key={quiz.quizid} quiz={quiz} />)}
                </div>
            </div>
            <div className="homeBlock">
                <div className="header">Explore more</div>
                <div className="cardsContainer"></div>
            </div>
            <div className="homeBlock">
                <div className="header">Connect with people</div>
                <div className="cardsContainer">{users && users.map((user) => <User user={user} />)}</div>
            </div>
        </div>
    );
};

export default Homepage;
