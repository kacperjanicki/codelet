import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { saveQuizToDb } from "../../api_helper/user_functions";
import { UserContext } from "../../App";
import { quizContext } from "./Quiz";

const EndScreen = ({ data, quizObj }) => {
    console.log(data);
    console.log(quizObj);
    return <Callback />;
};

const Callback = () => {
    return "callback";
};

export default EndScreen;
