import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import GameRaport from "./GameRaport";
import { getProfileInfo } from "../../api_helper/user_functions";
import { UserContext } from "../../App";

const EndScreen = ({ data, quizObj }) => {
    const [profile, setProfile] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const user = useContext(UserContext).userObj;

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            async function fetchProfile() {
                let info = await getProfileInfo(user.name);
                if (!info.err) setProfile(info.res);
                console.log(info);
            }
            fetchProfile();
            console.log(profile);
        }
    }, [loaded]);
    if (profile) return <Callback data={profile.games[profile.games.length - 1]} />;
};

const Callback = ({ data }) => {
    console.log(data);
    return <GameRaport data={data} />;
};

export default EndScreen;
