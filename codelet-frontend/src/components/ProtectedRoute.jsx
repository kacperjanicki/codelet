import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import Alert from "./Alert";

const ProtectedRoute = ({ children }) => {
    const userCon = useContext(UserContext);
    console.log(userCon);
    if (userCon.userObj) {
        return children;
    } else {
        return <Navigate to="/home" replace />;
    }
};

export default ProtectedRoute;
