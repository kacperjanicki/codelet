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
                <div className="bigMsg" style={{ textAlign: "center" }}>
                    {msg}
                </div>
                <div className="smallMsg" style={{ textAlign: "center" }}>
                    {msg &&
                        msg !== "No changes applied" &&
                        "In order for changes to properly appear, we recommend refreshing your page"}
                </div>
            </div>
            <div className="profileEdit">
                <div className="formContainer">
                    <div className="formRow">
                        <label>Username</label>
                        <input type="text" disabled defaultValue={userCon.userObj.name} />
                    </div>
                    <div className="formRow">
                        <label>Name</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setfName(e.target.value);
                            }}
                            defaultValue={userCon.userObj.fname}
                        />
                    </div>
                    <div className="formRow">
                        <label>Age</label>
                        <input
                            type="number"
                            onChange={(e) => {
                                setAge(e.target.value);
                            }}
                            defaultValue={userCon.userObj.age}
                        />
                    </div>
                    <div>
                        <AddProfilePic />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
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
                </div>
            </div>
        </div>
    );
};
// add profile photo component
const AddProfilePic = () => {
    return (
        <div>
            <span> Profile picture: </span>
            <span style={{ fontSize: "1rem" }}>coming soon...</span>
            <div>
                {/* <DefaultPics />
                <div>
                    <input type="file" />
                </div> */}
            </div>
        </div>
    );
};
// user may not want to upload a profile picture,
// give him few default pictures to pick from instead.
const DefaultPics = () => {
    function expand(e) {
        let btn = e.target;
        const hiddenDivs = document.querySelectorAll(".galleryHidden");
        if (btn.innerHTML === "Expand") {
            hiddenDivs.forEach((div) => {
                div.classList.add("galleryActive");
            });
            btn.innerHTML = "Hide";
        } else if (btn.innerHTML === "Hide") {
            hiddenDivs.forEach((div) => {
                div.classList.remove("galleryActive");
            });
            btn.innerHTML = "Expand";
        }
    }

    const [img, setImg] = useState(null);
    useEffect(() => {
        if (img == null) return;
        console.log(img.classList);
    }, [img]);

    return (
        <div>
            <span style={{ fontSize: "1rem" }}>Choose from available default avatars</span>
            <div className="gallery">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        expand(e);
                    }}
                >
                    Expand
                </button>
                <div className="galleryActive">
                    <Img
                        set={setImg}
                        src={
                            "https://cdn2.f-cdn.com/contestentries/1366909/28870354/5b47057dd991d_thumb900.jpg"
                        }
                    />
                </div>
                <div className="galleryActive">
                    <Img
                        set={setImg}
                        src={
                            "https://e7.pngegg.com/pngimages/90/53/png-clipart-team-fortress-2-playerunknown-s-battlegrounds-counter-strike-global-offensive-avatar-steam-avatar-thumbnail.png"
                        }
                    />
                </div>
                <div className="galleryActive">
                    <Img
                        set={setImg}
                        src={
                            "https://cdn.forums.klei.com/monthly_2019_07/20f26608ad4fe920ca079a5afdbb07b71120cdfd_full.jpg.1934c5e032dcceb97074e36cb8255018.jpg"
                        }
                    />
                </div>
                <div className="galleryHidden">
                    <Img
                        set={setImg}
                        src={"https://www.pwshoponline.com/assets/images/avatars/avatar1_big.png"}
                    />
                </div>
                {/* <div className="galleryHidden">
                    <Img set={setImg} />
                </div>
                <div className="galleryHidden">
                    <Img set={setImg} />
                </div> */}
            </div>
        </div>
    );
};

const Img = ({ set, src }) => {
    const galleryImgs = document.querySelectorAll(".selected");
    const selectImg = (e) => {
        galleryImgs.forEach((img) => {
            img.classList.remove("selected");
        });
        e.target.classList.add("selected");
        set(e.target);
    };
    return <img src={src} className="smallImg" onClick={selectImg} />;
};

export default EditProfile;
