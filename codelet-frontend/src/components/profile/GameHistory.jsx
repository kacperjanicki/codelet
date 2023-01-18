import React from "react";
import "./profile.css";

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

const GameRaport = ({ data }) => {
    console.log(data);
    return (
        <div key={data.id} className="gameLogCard">
            <div>Quiz played at {data.date.toLocaleString()}</div>
            <div>Score: {data.score}</div>
        </div>
    );
};

export default GameHistory;
