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
    const [name, setName] = useState(userCon.userObj.name);
    const [age, setAge] = useState(userCon.userObj.age);
    const [msg, setMsg] = useState();

    const navigate = useNavigate();
    const submitProfileEdit = (changedValues) => {
        async function edit() {
            console.log(changedValues);
            let res = await editProfile(userCon.userObj.name, changedValues);
            if (res.ok) {
                let newObj = userCon.userObj;
                newObj.name = name;
                localStorage.setItem("user", JSON.stringify(newObj));
                userCon.setUserObj(newObj);
                navigate(`/profile/${newObj.name}?msg=Updated successfully`);
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
                    {msg && "In order for changes to properly appear, we recommend refreshing your page"}
                </div>
            </div>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value, true);
                    }}
                    defaultValue={userCon.userObj.name}
                />
            </div>
            <div>
                <label>Name</label>
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
                    if (name !== userCon.userObj.name) obj["name"] = name;
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
