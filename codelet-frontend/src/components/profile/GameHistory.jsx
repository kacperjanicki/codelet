import React from "react";
import "./profile.css";

const GameHistory = ({ games }) => {
    console.log(games);

    return (
        <div className="gameLog">
            {games.map((game) => (
                <GameRaport data={game} key={game.id} />
            ))}
        </div>
    );
};

const GameRaport = ({ data }) => {
    return (
        <div key={data.id} className="gameLogCard">
            Game History:
            <div>Quiz played at {data.date}</div>
            <div>Score: {data.score}</div>
        </div>
    );
};

export default GameHistory;
