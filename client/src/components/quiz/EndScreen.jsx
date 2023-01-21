import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import GameRaport from "./GameRaport";
import { getProfileInfo } from "../../api_helper/user_functions";
import { UserContext } from "../../App";

const EndScreen = ({ data }) => {
    const [profile, setProfile] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [profileSet, setProfileSet] = useState(false);

    const user = useContext(UserContext).userObj;
    data = data[0];

    console.log(data);

    // console.log(profile.games, profile.games.length - 1);
    return <GameRaport data={data} />;
};

const Callback = ({ data }) => {
    // console.log(data);
    return <GameRaport data={data} />;
};

export default EndScreen;
