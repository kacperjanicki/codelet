import { loginReq } from "../api_helper/user_functions";
import React, { useState, useSearchParams } from "react";
import { useEffect } from "react";
import { Fragment } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [redirectedUser, setRedirectedUser] = useState(undefined);
    const [autoFocus, setAutoFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState();

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const message = params.get("msg");
        const user = params.get("username");
        setRedirectedUser(user);
        setMsg(message);
        setUsername(user);
    }, [msg, redirectedUser]);

    return (
        <Fragment>
            {msg ? msg : ""}
            <form
                className="login"
                onSubmit={(e) => {
                    e.preventDefault();
                    loginReq(username, password);
                }}
            >
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                        required
                    />
                </div>
                <div>
                    {/* add password regex validation */}
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        // minLength={6}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <button>Log in</button>
                </div>
            </form>
        </Fragment>
    );
};
export default Login;
