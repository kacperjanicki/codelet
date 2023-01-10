import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../api_helper/user_functions";
import { UserContext } from "../App";

const Navbar = () => {
    const userCon = useContext(UserContext);
    // console.log(userCon.userObj);

    return (
        <ul className="navbar">
            <li>
                <Link to="/home">Home</Link>
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
            ) : (
                <>
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
                    logged in as {userCon.userObj.name}
                </>
            )}
        </ul>
    );
};

export default Navbar;
