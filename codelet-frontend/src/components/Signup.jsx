import React, { useState } from "react";
import { singUpReq } from "../api_helper/user_functions";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    return (
        <form
            className="login"
            onSubmit={(e) => {
                e.preventDefault();
                singUpReq(username, password, email);
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
            </div>

            <div>
                <button>Sign up</button>
            </div>
        </form>
    );
};

export default Signup;
