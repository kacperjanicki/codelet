import React from "react";

const RouteNotFound = ({ msg }) => {
    let path;
    // this piece of code allows this component
    // to handle global not found route and also
    // it will display username of requested user
    // when /profile/:user and /quiz/:quizLang/:quizId doesnt exist

    if (msg.length == 2) {
        path = window.location.href.split("/")[1];
    } else if (msg[1].includes("undefined")) {
        path = undefined;
    } else {
        path = msg[1];
    }
    return (
        <div className="notFound">
            <div className="header">404 page not found</div>
            <span className="notFoundmsg">{msg[0]} </span>
            <span className="notFoundRoute">{path && path} </span>
            <span className="notFoundmsg">{msg[2] || msg[1]}</span>
        </div>
    );
};

export default RouteNotFound;
