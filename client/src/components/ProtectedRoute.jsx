import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import Alert from "./Alert";

const ProtectedRoute = ({ children }) => {
    const userCon = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => setLoading(false), []);

    if (!loading) {
        if (userCon.userObj) {
            return children;
        } else {
            return <Navigate to="/home" replace />;
        }
    } else {
        return "loading...";
    }
};

export default ProtectedRoute;
