const express = require("express");
const verifyJwt = require("../middleware/verifyJWT");
const pool = require("../db");
const personalAction = require("../middleware/personalAction");
const router = express.Router();

router.get("/fetchQuiz/:lang/:id", verifyJwt, async (req, res) => {
    let requestedLang = req.params.lang;
    let requestedId = req.params.id;

    let query = await pool.query(`SELECT * FROM quizes WHERE quizid=$1;`, [requestedLang + requestedId]);

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

// this endpoint handles saving data about game that user just played, score,date etc.
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

// this endpoint handles adding new quizes by user at codelet.com/create
router.post("/addNewQuiz", async (req, res) => {
    const { name, lang, desc, questions, no, author_id } = req.body;
    let query = await pool.query(
        `INSERT INTO quizes(author_id,lang,quizid,public,questions) VALUES($1,$2,$3,$4,$5);`,
        [author_id, lang, lang + no, true, questions]
    );
    console.log(query);
});

// will be as an endpoint when needed
let langsAvailable = ["python", "javascript"];

router.post("/newQuizId", async (req, res) => {
    const { lang } = req.body;
    if (lang) {
        if (!langsAvailable.includes(lang))
            return res.status(400).json({ ok: false, msg: "Language not supported" });

        try {
            let langQuery = await pool.query("SELECT id FROM quizes WHERE lang=$1;", [lang]);
            let count = langQuery.rowCount + 1;
            // `no` is used to generate a url for every quiz e.x. codelet.com/quiz/python/001
            let no = count.toString().padStart(3, "0");

            return res.status(200).json({ ok: true, data: { lang: lang, id: no } });
        } catch (err) {
            return res.status(400).json({ ok: false, msg: "An error occured", err: err });
        }
    } else if (!lang) {
        return res.status(400).json({ ok: false, msg: "You need to specify a language" });
    }
    console.log(lang);
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
