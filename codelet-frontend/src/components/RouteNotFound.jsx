import React from "react";

const RouteNotFound = ({ msg }) => {
    return (
        <div className="notFound">
            <div className="header">404 page not found</div>
            <div className="notFoundmsg">{msg}</div>
        </div>
    );
};

export default RouteNotFound;
