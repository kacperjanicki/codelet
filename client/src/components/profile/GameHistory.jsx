import React, { useState } from "react";
import "./profile.css";
import GameRaport from "../quiz/GameRaport";
import DeleteGame from "./DeleteGame";

import { RxCounterClockwiseClock, RxClock } from "react-icons/rx";

const GameHistory = ({ games, personalContent }) => {
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
                    <div style={{ fontSize: "2.5rem" }}> Game history:</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.5rem" }}>
                        Games are being sorted {sortingStr}
                        {sorting == "desc" ? <RxClock /> : <RxCounterClockwiseClock />}
                    </div>
                    <div className="sortDiv">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSorting("asc");
                            }}
                            className="sortBtn"
                        >
                            Sort by oldest
                            <RxCounterClockwiseClock size="1.5em" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setSorting("desc");
                            }}
                            className="sortBtn"
                        >
                            Sort by newest
                            <RxClock size="1.5em" />
                        </button>
                    </div>
                    <div className="gamesContainer">
                        {games.map((game) => (
                            <div className="gameDiv">
                                <GameRaport data={game} personalContent={personalContent} />
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
