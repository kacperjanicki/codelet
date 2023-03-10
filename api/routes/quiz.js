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

// router.get("/validateName", async (req, res) => {
//     const { name } = req.query;
//     let query = await pool.query("SELECT * FROM quizes WHERE quizname=$1;", [name]);
//     if(query.rowCount>0){
//         res.status(400).json({ok:false,msg:"Quiz name"})
//     }else{

//     }
//     res.json({ name: name });
// });

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
    const { lang, no, quizId, user_id, score, callback, questions } = req.body;
    let raport = { callback: callback };
    let questionData = { questions: questions };
    let date = new Date();
    let quizById = await pool.query("SELECT * FROM quizes WHERE quizid=$1;", [quizId]);

    let pol = await pool.query(
        `INSERT INTO quizgames(quizId,quizData,lang,no,player_id,score,date,callback,questions,public) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
        [quizId, quizById.rows[0], lang, no, user_id, score, date, raport, questionData, true]
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
    let { name, lang, desc, questions, no, author_id } = req.body;
    questions = { questions: questions };
    let authorQuery = await pool.query(`SELECT * FROM users WHERE user_id=$1;`, [author_id]);
    let author = authorQuery.rowCount > 0 && JSON.stringify(authorQuery.rows[0]);

    let query = await pool.query(
        `INSERT INTO quizes(author_id,author,lang,quizid,quizName,quizDesc,public,questions,date) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
        [author_id, author, lang, lang + no, name, desc, true, questions, new Date()]
    );
    if (query.rowCount != 1) {
        console.log(query);
        return res.send({ ok: false });
    }
    return res.send({ ok: true });
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
            // `no` is used to generate a url for every quiz e.x. codelet.com/quiz/python_001
            let no = count.toString().padStart(3, "0");

            console.log(langQuery);
            console.log(count);
            console.log(no);

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
