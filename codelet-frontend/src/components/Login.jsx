import { loginReq } from "../api_helper/user_functions";
import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
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
    );
};
export default Login;
