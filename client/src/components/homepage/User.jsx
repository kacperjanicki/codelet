import React from "react";

const User = ({ user }) => {
    console.log(user);
    return (
        <div className="user">
            <div className="img">
                <img
                    src="https://www.pwshoponline.com/assets/images/avatars/avatar1_big.png"
                    className="profileImage"
                />
            </div>

            <div className="name">
                {user.fname[0].toUpperCase() + user.fname.slice(1)}{" "}
                {user.lname[0].toUpperCase() + user.lname.slice(1)}
            </div>
            <div className="userBottom">x mutual friends</div>
        </div>
    );
};

export default User;
