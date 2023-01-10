import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../api_helper/user_functions";
import { UserContext } from "../App";

const Navbar = () => {
    const userCon = useContext(UserContext);
    const history = useNavigate();

    console.log(userCon.userObj);

    return (
        <nav className="navbar">
            <ul className="nav navLeft">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/quiz">Quiz</Link>
                </li>
                {!userCon.userObj ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                ) : null}
            </ul>
            {userCon.userObj ? (
                <ul className="nav navRight">
                    <li>
                        <span style={{ fontSize: "1rem" }}>logged in as {userCon.userObj.name}</span>
                    </li>
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                localStorage.removeItem("user");
                                localStorage.removeItem("token");
                                userCon.setUserObj();
                            }}
                        >
                            Sign out
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                history(`/profile/${userCon.userObj.name}`);
                            }}
                        >
                            Profile
                        </button>
                    </li>
                </ul>
            ) : null}
        </nav>
    );
};

export default Navbar;
