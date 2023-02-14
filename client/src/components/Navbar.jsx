import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../api_helper/user_functions";
import { UserContext } from "../App";
import { AiFillHome, AiFillFileAdd } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    const userCon = useContext(UserContext);
    const history = useNavigate();

    return (
        <nav className="navbar">
            <ul className="nav navLeft">
                <li className="navItem">
                    <AiFillHome
                        className="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            history("/home");
                        }}
                    />
                    <Link to="/home">Home</Link>
                </li>
                <li className="navItem">
                    <MdExplore
                        className="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            history("/explore");
                        }}
                    />
                    <Link to="/explore">Explore</Link>
                </li>
                <li className="navItem">
                    <AiFillFileAdd className="icon" />
                    <Link to="/create">Create</Link>
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
                    <li className="navItem">
                        <RiLogoutBoxRFill
                            className="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                localStorage.removeItem("user");
                                localStorage.removeItem("token");
                                userCon.setUserObj();
                            }}
                        />
                    </li>
                    <li className="navItem">
                        {/* onClick={(e) => {
                                e.preventDefault();
                                history(`/profile/${userCon.userObj.name}`); */}
                        {/* <Link to={`/profile/${userCon.userObj.name}`}>Profile</Link> */}
                        <FaUser
                            className="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                history(`/profile/${userCon.userObj.name}`);
                            }}
                        />
                        <span
                            style={{ fontSize: "1rem" }}
                            onClick={() => {
                                history(`/profile/${userCon.userObj.name}`);
                            }}
                        >
                            {userCon.userObj.fname.charAt(0).toUpperCase() + userCon.userObj.fname.slice(1)}
                        </span>
                    </li>
                </ul>
            ) : null}
        </nav>
    );
};

export default Navbar;
