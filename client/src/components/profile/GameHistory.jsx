import React, { useState } from "react";
import "./profile.css";
import GameRaport from "../quiz/GameRaport";
import DeleteGame from "./DeleteGame";

const GameHistory = ({ games }) => {
    const [sorting, setSorting] = useState("desc");
    // const [sortingStr, setSortingStr] = useState("");

    let sortingStr;

    switch (sorting) {
        //sorting by date
        case "desc":
            games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            sortingStr = "by newest";
            break;
        case "asc":
            games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            sortingStr = "by oldest";
            break;
    }

    return (
        <div className="gameLog">
            {games.length > 0 && (
                <div>
                    <div>Games are being sorted {sortingStr}</div>
                    <div className="sortDiv">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSorting("desc");
                            }}
                            className="sortBtn"
                        >
                            Sort by newest
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSorting("asc");
                            }}
                            className="sortBtn"
                        >
                            Sort by oldest
                        </button>
                    </div>
                    <div className="gamesContainer">
                        Game history:
                        {games.map((game) => (
                            <div className="gameDiv">
                                <GameRaport data={game} />
                                <DeleteGame game={game} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {games.length === 0 && "No games found"}
        </div>
    );
};

export default GameHistory;
