const express = require("express");
const verifyJwt = require("./verifyJWT");
const pool = require("./db");
const router = express.Router();
const fs = require("fs");

//later this will be held in seperate endpoint
//when more quizes are available and users can create quizes
let allQuizIds = ["python001"];

router.get("/fetchQuiz/:id", verifyJwt, (req, res) => {
    let requestedQuiz = req.params.id;
    let file;
    if (allQuizIds.includes(requestedQuiz)) {
        fs.readFile("./" + requestedQuiz + ".json", (err, data) => {
            file = JSON.parse(data);
            res.json({ ok: true, data: JSON.parse(data) });
        });
    } else {
        res.status(404).json({ ok: false, msg: `Quiz ${requestedQuiz} not found` });
    }
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
