import React, { useState } from "react";
import "./profile.css";
import Modal from "react-modal";
import GameRaport from "../quiz/GameRaport";

const GameHistory = ({ games }) => {
    // games.forEach((game) => {
    //     console.log(new Date(game.date).getTime());
    // });
    let typeOfSorting;
    const [sorting, setSorting] = useState("asc");
    if (sorting == "asc") {
        games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sorting == "desc") {
        games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return (
        <div className="gameLog">
            {games.length > 0 && (
                <>
                    <div>Games are being sorted {sorting}</div>
                    Game history:
                    {games.map((game) => (
                        <GameRaport data={game} />
                    ))}
                </>
            )}
            {games.length === 0 && "No games found"}
        </div>
    );
};

export default GameHistory;
