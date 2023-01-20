const express = require("express");
const verifyJwt = require("./verifyJWT");
const pool = require("./db");
const router = express.Router();
const fs = require("fs");

//later this will be held in seperate endpoint
//when more quizes are available and users can create quizes
let allQuizIds = ["python001"];

router.get("/fetchQuiz/:lang/:id", verifyJwt, async (req, res) => {
    let requestedLang = req.params.lang;
    let requestedId = req.params.id;

    let query = await pool.query(`SELECT * FROM quizes WHERE lang=$1 AND no=$2;`, [
        requestedLang,
        requestedId,
    ]);
    if (query.rowCount > 0) {
        let quiz = query.rows[0];

        res.status(200).json({ ok: true, data: quiz });
        // res.json({ok:true,data:query})
    } else {
        res.status(404).json({ ok: false, msg: `Quiz ${requestedLang}${requestedId} not found` });
    }
});

router.get("/allQuizesFetch", async (req, res) => {
    let query = await pool.query(`SELECT * FROM quizes;`);
    if (query.rowCount > 0) {
        res.status(200).json({ ok: true, quizList: query.rows });
    } else {
        res.status(404).json({ ok: false, msg: `No available quizes` });
    }
});

router.post("/newquiz", (req, res) => {
    const { user_id, score, callback, questions } = req.body;
    let raport = { callback: callback };
    let questionData = { questions: questions };
    let pol = pool.query(
        `INSERT INTO quizgames(player_id,score,date,callback,questions) VALUES($1,$2,$3,$4,$5);`,
        [user_id, score, new Date(), raport, questionData]
    );
    res.send(pol);
});

module.exports = router;
