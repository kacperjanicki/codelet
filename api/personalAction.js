const pool = require("./db");

module.exports = async (req, res, next) => {
    let currectUserId = req.userId;
    let userRequestedName = req.params.id;

    let query = await pool.query(`SELECT * FROM users WHERE name=$1;`, [userRequestedName]);

    console.log(userRequestedName);

    if (query.rowCount > 0) {
        let result = query.rows[0];

        if (req.userId == result.user_id) {
            next();
        }
    } else {
        return res.status(403).json({ ok: false, msg: "Access denied" });
    }
};
