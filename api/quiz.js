const express = require("express");
const verifyJwt = require("./verifyJWT");
const pool = require("./db");
const personalAction = require("./personalAction");
const router = express.Router();

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

router.post("/newquiz", async (req, res) => {
    const { user_id, score, callback, questions } = req.body;
    let raport = { callback: callback };
    let questionData = { questions: questions };
    let date = new Date();
    let pol = await pool.query(
        `INSERT INTO quizgames(player_id,score,date,callback,questions,public) VALUES($1,$2,$3,$4,$5,$6);`,
        [user_id, score, date, raport, questionData, true]
    );
    let id = await pool.query(
        `
    SELECT id FROM quizgames WHERE date=$1;`,
        [date]
    );
    let quizID = id.rows[0].id;

    let quizObj = await pool.query(
        `
    SELECT * FROM quizgames WHERE id=$1;
    `,
        [quizID]
    );

    res.json(quizObj.rows);
});

router.put("/:id/changePublicity", verifyJwt, personalAction, async (req, res) => {
    console.log(req.body);
    let publicity = req.body.public;
    let query = await pool.query(`UPDATE quizgames SET public=$1 WHERE id=$2;`, [
        publicity == "public",
        req.body.id,
    ]);
    if (query.rowCount > 0) {
        res.status(200).json({
            ok: true,
            msg: "Successfully updated",
            callback: `Quiz publicity is ${publicity}`,
        });
    } else {
        res.status(400).json({ ok: false, msg: "An error occurred" });
    }
    console.log(publicity);
});

module.exports = router;
