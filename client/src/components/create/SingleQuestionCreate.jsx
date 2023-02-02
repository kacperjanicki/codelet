import React from "react";
import { useEffect } from "react";

const SingleQuestionCreate = ({ index, questions, setQuestions }) => {
    useEffect(() => {
        console.log(index);
    }, []);
    return <div>Single</div>;
};

export default SingleQuestionCreate;
