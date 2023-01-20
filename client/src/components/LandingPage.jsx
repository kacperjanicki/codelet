import React from "react";
import { Navigate, redirect } from "react-router-dom";

const LandingPage = () => {
    let user = false;
    if (!user) return <Navigate to="/login" />;
    return "hello";
};
export default LandingPage;

// const HomePage = () => {
//     return "homepage";
// };
