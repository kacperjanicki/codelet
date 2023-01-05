import React, { useState, useEffect } from "react";
import { singUpReq } from "../api_helper/user_functions";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (shouldRedirect)
            navigate(`/login?msg=Account created, now you can log in
        &username=${username}`);
    }, [shouldRedirect]);
    return (
        <form
            className="login"
            onSubmit={(e) => {
                e.preventDefault();
                let result = singUpReq(username, password);
                console.log(result);
                result.then((data) => {
                    console.log(data);
                    if (data.ok) {
                        console.log(data);
                        setShouldRedirect(true);
                    }
                });
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
    );
};

export default Signup;
