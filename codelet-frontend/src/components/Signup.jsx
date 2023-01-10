import React, { useState, useEffect, Fragment } from "react";
import { singUpReq } from "../api_helper/user_functions";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (shouldRedirect)
            navigate(`/login?msg=Account created, now you can log in
        &username=${username}`);
    }, [shouldRedirect]);
    return (
        <Fragment>
            {err}
            <form
                className="login"
                onSubmit={async (e) => {
                    e.preventDefault();
                    let result = await singUpReq(username, password);
                    if (result) {
                        if (result.ok) setShouldRedirect(true);
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
                {/* <div>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    // minLength={6}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                />
            </div> */}
                <div>
                    <button>Sign up</button>
                </div>
            </form>
        </Fragment>
    );
};

export default Signup;
