import React, { useState, useEffect, Fragment } from "react";
import { getProfileInfo } from "../../api_helper/user_functions";
import GameHistory from "./GameHistory";

const Profile = () => {
    let username = window.location.href.split("/")[4];

    const [profile, setProfile] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            async function fetchProfile() {
                let info = await getProfileInfo(username);
                if (!info.err) setProfile(info.res);
                console.log(info);
            }
            fetchProfile();
        }
    }, [loaded]);

    if (profile) {
        return (
            <Fragment>
                <div>{profile.name} Profile</div>
                <GameHistory games={profile.games} />
            </Fragment>
        );
    } else {
        return "User not found";
    }
};

export default Profile;
