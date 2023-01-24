import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { editProfile } from "../../api_helper/user_functions";
import { UserContext } from "../../App";

const EditProfile = () => {
    const userCon = useContext(UserContext);
    // console.log(userCon.userObj);
    const [name, setName] = useState(userCon.userObj.name);
    const [msg, setMsg] = useState();

    console.log(userCon.userObj);

    const submitProfileEdit = () => {
        async function edit() {
            let res = await editProfile(userCon.userObj.name, name);
            if (res.ok) {
                let newObj = userCon.userObj;
                newObj.name = name;
                localStorage.setItem("user", JSON.stringify(newObj));
                userCon.setUserObj(newObj);
            }
            setMsg(res.msg);
        }
        edit();
    };

    console.log(userCon);

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
                        setName(e.target.value);
                    }}
                    defaultValue={userCon.userObj.name}
                />
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    submitProfileEdit();
                }}
            >
                Edit
            </button>
        </div>
    );
};

export default EditProfile;
