import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// this component listens for `msg` query param in every url
// when `msg` param is present, it displays alert box in the corner

const Alert = () => {
    const [queryParams, setQueryParams] = useState({});
    const [shouldDisplay, setShouldDisplay] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = {};
        for (const [key, value] of params.entries()) {
            query[key] = value;
        }
        setQueryParams(query);
    }, []);
    useEffect(() => {
        if (queryParams.msg) setShouldDisplay(true);
    }, [queryParams]);
    console.log(queryParams);
    if (shouldDisplay) {
        return (
            <>
                <div className="alertContainer bottomLeft">
                    <div className="alert alertActive bottomLeft">
                        {queryParams.msg}
                        <div class="timer timerActive"></div>
                    </div>
                </div>
            </>
        );
    }
};

export default Alert;
