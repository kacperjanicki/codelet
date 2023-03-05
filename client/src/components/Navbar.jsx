import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../api_helper/user_functions";
import { UserContext } from "../App";
import { AiFillHome, AiFillFileAdd, AiFillBug } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import logo from "./logo.png";
import Alert from "./Alert";
import Modal from "react-modal";

const Navbar = () => {
    const userCon = useContext(UserContext);
    const history = useNavigate();

    useEffect(() => {
        let currentLoc = window.location.href.split("/")[3];
        let locations = document.querySelectorAll(".navItem");

        locations.forEach((loc) => {
            let parent = loc.parentElement;
            let marker = document.createElement("div");

            // parent.removeChild(parent.childNodes[1]);

            if (loc.dataset.location == currentLoc) {
                if (parent.childNodes.length < 2) {
                    parent.appendChild(marker);
                    marker.className = "marker";
                }
            } else {
                if (!parent.querySelector(".marker")) return;
                parent.querySelector(".marker").remove();
            }
        });
    });

    // let current = locations.filter((loc) => console.log(loc));
    // console.log(locations);
    // let markerDiv = locations.parentElement

    return (
        <>
            <nav className="navbar">
                <ul className="nav navLeft">
                    {/* <div>
                    <li className="navItem"> */}
                    <div>
                        <li
                            className="navItem"
                            data-location="home"
                            onClick={(e) => {
                                e.preventDefault();
                                history("/home");
                            }}
                        >
                            <div style={{ display: "flex", bottom: "5px", position: "relative" }}>
                                <img src={logo} style={{ height: "40px" }} />
                            </div>
                        </li>
                    </div>
                    <div>
                        <li className="navItem" data-location="explore">
                            <MdExplore
                                className="icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history("/explore");
                                }}
                            />
                            <Link to="/explore">Explore</Link>
                        </li>
                    </div>
                    <div>
                        <li className="navItem" data-location="create">
                            <AiFillFileAdd
                                className="icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history("/create");
                                }}
                            />
                            <Link to="/create">Create</Link>
                        </li>
                    </div>
                </ul>
                {!userCon.userObj ? (
                    <ul className="nav navRight" style={{ alignItems: "center" }}>
                        <div>
                            <li className="navItem">
                                <span style={{ fontSize: "1rem" }}> Report a bug</span>
                                <AiFillBug className="icon" />
                            </li>
                        </div>
                        <div>
                            <li className="navItem" data-location="login">
                                <Link to="/login">Login</Link>
                            </li>
                        </div>
                        <div>
                            <li className="navItem" data-location="signup">
                                <Link to="/signup">Sign up</Link>
                            </li>
                        </div>
                    </ul>
                ) : null}
                {userCon.userObj ? (
                    <ul className="nav navRight">
                        <div>
                            <li className="navItem">
                                <span style={{ fontSize: "1rem" }} className="hidden">
                                    {" "}
                                    Report a bug
                                </span>
                                <Bug />
                            </li>
                        </div>

                        <div>
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
                        </div>
                        <div>
                            <li className="navItem" data-location="profile">
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
                                    {userCon.userObj.fname.charAt(0).toUpperCase() +
                                        userCon.userObj.fname.slice(1)}
                                </span>
                            </li>
                        </div>
                    </ul>
                ) : null}
            </nav>
        </>
    );
};

const Bug = () => {
    const [isOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    Modal.setAppElement(document.getElementById("root"));
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName={"Overlay"}
                className={"Modal"}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        return false;
                    }}
                >
                    <div className="issue">Please email me at kacper.janicki523@gmail.com</div>
                    Bugs I'm aware of:
                    <ul>
                        <li>On publicity step in quiz creation you need to click 'next' button two times.</li>
                    </ul>
                    Features coming:
                    <ul>
                        <li>Profile pictures</li>
                        <li>Friend requests, friends community tab, see what quizes your friends' play </li>
                        <li>Rank system, for every win you gain xp, for every lose you lose xp</li>
                    </ul>
                </form>
            </Modal>
            <AiFillBug
                className="icon"
                onMouseOver={(e) => {
                    e.preventDefault();
                    e.target.previousSibling.classList.add("visible");
                }}
                onMouseLeave={(e) => {
                    e.preventDefault();
                    e.target.previousSibling.classList.remove("visible");
                }}
                onClick={(e) => {
                    e.preventDefault();
                    openModal();
                }}
            />
        </>
    );
};

export default Navbar;
