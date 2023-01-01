import { useContext } from "react";
import { useState, useEffect } from "react";
import { quizContext } from "./Quiz";

function SimpleCountdown() {
    const { nextQuestion, seconds, setSeconds, COUNTDOWN_TIME } = useContext(quizContext);

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
        if (seconds == 0) {
            console.log("catch");
            nextQuestion();
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
