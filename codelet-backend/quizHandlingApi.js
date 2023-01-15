const express = require("express");
const verifyJwt = require("./verifyJWT");
const pool = require("./db");
const router = express.Router();
const fs = require("fs");

router.get("/fetchQuiz/:id", verifyJwt, (req, res) => {
    let requestedQuiz = req.params.id;
    let file;
    fs.readFile("./" + requestedQuiz + ".json", (err, data) => {
        file = JSON.parse(data);
        res.json({ msg: "hello", data: JSON.parse(data) });
    });
});

router.post("/newquiz", (req, res) => {
    const { user_id, score } = req.body;
    let pol = pool.query(`INSERT INTO quizgames(player_id,score,date) VALUES($1,$2,$3);`, [
        user_id,
        score,
        new Date(),
    ]);
    res.send(pol);
});

module.exports = router;
