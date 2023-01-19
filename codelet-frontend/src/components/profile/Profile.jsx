import React, { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileInfo } from "../../api_helper/user_functions";
import RouteNotFound from "../RouteNotFound";
import GameHistory from "./GameHistory";

const Profile = () => {
    let { username } = useParams();

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
            console.log(profile);
        }
    }, [loaded]);
    let personalContent = true;

    if (!loaded) return "loading..";
    if (loaded) {
        if (profile) {
            return (
                <div className="profile">
                    <div>{profile.name} Profile</div>
                    {personalContent ? <Link to="/profile/a/edit">Edit profile</Link> : null}
                    <GameHistory games={profile.games} />
                </div>
            );
        } else {
            return <RouteNotFound msg={["User", username, "not found"]} />;
        }
    }
};

export default Profile;
