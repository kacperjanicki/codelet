// import React from "react";
// import { useEffect } from "react";

// const TIMER_DURATION = 5500;
// const CHANGE_QUESTION_DELAY = 2000;

// let startDefaultTimer;
// let stopDefaultTimer;

// const HandleTimer = ({ question }) => {
//     let defaultTimer;
//     startDefaultTimer = () => {
//         defaultTimer = setTimeout(() => {
//             //show correct answer, wait 2s and move to next question
//             let correct = document.getElementById(question.correct);
//             correct.classList.add("correct");

//             setTimeout(() => {
//                 // nextQuestion();
//             }, CHANGE_QUESTION_DELAY);
//         }, TIMER_DURATION);
//     };
//     stopDefaultTimer = () => {
//         clearTimeout(defaultTimer);
//     };

//     //when timer passes
//     let timerPassed = document.querySelector(".deactive");
//     if (timerPassed) {
//         timerPassed.classList.remove("deactive");
//     }
//     useEffect(() => {
//         //when question changes, clear previous timer and start a new one
//         stopDefaultTimer();
//         startDefaultTimer();
//     }, [question]);
// };

// export default HandleTimer;
