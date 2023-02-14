import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../api_helper/user_functions";
import { UserContext } from "../../App";

const EditProfile = () => {
    const userCon = useContext(UserContext);
    // console.log(userCon.userObj);
    const [fname, setfName] = useState(userCon.userObj.fname);
    const [age, setAge] = useState(userCon.userObj.age);
    const [msg, setMsg] = useState();

    const navigate = useNavigate();
    const submitProfileEdit = (changedValues) => {
        async function edit() {
            let res = await editProfile(userCon.userObj.name, changedValues);
            console.log(res);
            if (res.ok) {
                let newObj = userCon.userObj;
                newObj.fname = fname;
                localStorage.setItem("user", JSON.stringify(newObj));
                userCon.setUserObj(newObj);
                navigate(`/profile/${userCon.userObj.name}?msg=Updated successfully`);
            }
            setMsg(res.msg);
        }
        edit();
    };

    return (
        <div>
            <div className="msgAlert">
                <div className="bigMsg">{msg}</div>
                <div className="smallMsg">
                    {msg !== "No changes applied" &&
                        "In order for changes to properly appear, we recommend refreshing your page"}
                </div>
            </div>
            <div>
                <label>Username</label>
                <input type="text" disabled defaultValue={userCon.userObj.name} />
            </div>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setfName(e.target.value);
                    }}
                    defaultValue={userCon.userObj.fname}
                />
            </div>
            <div>
                <label>Age</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setAge(e.target.value);
                    }}
                    defaultValue={userCon.userObj.age}
                />
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    let obj = {};
                    if (fname !== userCon.userObj.fname) obj["fname"] = fname;
                    if (age !== userCon.userObj.age) obj["age"] = age;
                    submitProfileEdit(obj);
                }}
            >
                Edit
            </button>
        </div>
    );
};

export default EditProfile;
