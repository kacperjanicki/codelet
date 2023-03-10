import { useContext } from "react";
import { useState, useEffect } from "react";
import { quizContext } from "./Quiz";

//variable that stops questions from switching automatically
//true in deployment, false in production
const deployed = false;

function SimpleCountdown() {
    const { nextQuestion, seconds, setSeconds, COUNTDOWN_TIME } = useContext(quizContext);

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((seconds) => seconds - 1);
                }
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
        if (seconds == 0) {
            // console.log("catch");
            if (deployed) nextQuestion();
            setSeconds(COUNTDOWN_TIME);
        }
    }, [seconds]);

    return (
        <div className="timerParent">
            <div className="timer timerActive"></div>
            {seconds} seconds remaining
        </div>
    );
}

export default SimpleCountdown;
