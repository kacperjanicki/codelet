import React from "react";
import { useEffect, useState } from "react";
import { fetchQuiz } from "../../api_helper/user_functions";
import RouteNotFound from "../RouteNotFound";
//this component will redirect when quizId is not valid

const QuizRoute = ({ children }) => {
    var quizId = window.location.href.split("/")[4].split("_")[1];
    var quizLang = window.location.href.split("/")[4].split("_")[0];

    console.log(quizId, quizLang);

    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [msg, setMsg] = useState(false);

    useEffect(() => {
        async function isQuizValid() {
            let response = await fetchQuiz(quizLang, quizId);
            if (response.ok) setValid(true);
            else if (!response.ok) setMsg(["Quiz", `${quizLang}${quizId}`, "not found"]);
            console.log(response);
            setLoading(false);
        }
        isQuizValid();
    }, []);

    if (loading) return "loading...";
    if (valid) return children;
    else if (!valid) return <RouteNotFound msg={msg} />;
};

export default QuizRoute;
