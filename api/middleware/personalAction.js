const pool = require("../db");

// this middleware will prevent user `A` from changing anything vulnerable to user `B`
// only user `B` can for example change his profile credentials
// same goes for quiz games, only user `A` should only be able to change publicity of his own quizes

module.exports = async (req, res, next) => {
    let currectUserId = req.userId;
    let userRequestedName = req.params.id;

    // console.log(userRequestedName, currectUserId);

    let profileQuery;
    let quizQuery;

    if (req.originalUrl.includes("user")) {
        profileQuery = await pool.query(`SELECT * FROM users WHERE name=$1;`, [userRequestedName]);
    } else if (req.originalUrl.includes("quiz")) {
        quizQuery = await pool.query("SELECT * FROM quizgames WHERE id=$1 AND player_id=$2;", [
            userRequestedName,
            currectUserId,
        ]);
    }

    if (profileQuery && profileQuery.rowCount > 0) {
        let result = profileQuery.rows[0];

        if (req.userId == result.user_id) {
            next();
        }
    } else if (quizQuery && quizQuery.rowCount > 0 && quizQuery.rows[0].id === req.body.id) {
        next();
    } else {
        return res.status(403).json({ ok: false, msg: "Access denied" });
    }
};
