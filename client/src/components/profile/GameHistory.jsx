import React, { useState } from "react";
import "./profile.css";
import Modal from "react-modal";
import GameRaport from "../quiz/GameRaport";

const GameHistory = ({ games }) => {
    console.log(games);
    return (
        <div className="gameLog">
            {games.length > 0 && (
                <>
                    Game history:
                    {games.map((game) => (
                        <GameRaport data={game} key={game.id} />
                    ))}
                </>
            )}
            {games.length === 0 && "No games found"}
        </div>
    );
};

export default GameHistory;
