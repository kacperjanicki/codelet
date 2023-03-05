import React, { useState, useEffect, useContext } from "react";
import { singUpReq } from "../api_helper/user_functions";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (shouldRedirect)
            navigate(`/login?msg=Account created, now you can log in
        &username=${username}`);
    }, [shouldRedirect]);
    const userObj = useContext(UserContext);

    useEffect(() => {
        if (userObj.userObj) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="middle">
            {err}
            <form
                className="login"
                onSubmit={async (e) => {
                    e.preventDefault();
                    let result = await singUpReq(username, fname, lname, password, age);
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
                    <input
                        type="text"
                        placeholder="First Name"
                        name="fname"
                        onChange={(e) => {
                            setFname(e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lname"
                        onChange={(e) => {
                            setLname(e.target.value);
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
                    {/* add password regex validation */}
                    <input
                        type="number"
                        placeholder="Age"
                        name="age"
                        // minLength={6}
                        onChange={(e) => {
                            setAge(e.target.value);
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
        </div>
    );
};

export default Signup;
