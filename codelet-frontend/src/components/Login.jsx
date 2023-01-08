import { loginReq } from "../api_helper/user_functions";
import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [redirectedUser, setRedirectedUser] = useState(undefined);
    const [autoFocus, setAutoFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState();
    const [err, setErr] = useState("");
    const history = useNavigate();

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
            {err}
            <form
                className="login"
                onSubmit={async (e) => {
                    e.preventDefault();
                    let result = await loginReq(username, password);
                    if (result) {
                        if (result.ok) history("/LoggedIn");
                        else setErr(result.msg);
                    }
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
                        // value={username}
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
