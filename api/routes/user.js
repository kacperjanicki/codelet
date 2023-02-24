const express = require("express");
const router = express.Router();
const pool = require("../db");
const personalAction = require("../middleware/personalAction");
const verifyJWT = require("../middleware/verifyJWT");

// this endpoint is used to fetch user data from db based on ID
// instead of fetching by username, when fetching by username it can cause
// problems for example when someone changes username
router.get("/:id/byId", verifyJWT, async (req, res) => {
    const { id } = req.params;
    let query = await pool.query(
        `
    SELECT * FROM users WHERE user_id=$1;
    `,
        [id]
    );
    res.send(query);
});

router.get("/allUsersFetch", async (req, res) => {
    let query = await pool.query("SELECT * FROM users;");
    res.send(query.rows);
});

router.put("/:id/editProfile", verifyJWT, personalAction, async (req, res) => {
    const { id } = req.params;

    let valuesToChange = req.body;

    try {
        let initUserQuery = await pool.query(`SELECT * FROM users WHERE name=$1;`, [id]);
        if (initUserQuery.rowCount == 0) return res.status(400, { ok: false, msg: "User does not exist" });

        let initUser = initUserQuery.rows[0];
        let hasChanged = false;

        for (const [key, value] of Object.entries(valuesToChange)) {
            if (["fname", "age"].includes(key)) {
                hasChanged = true;
                initUser[key] = value;
            }
        }

        let query = await pool.query(`UPDATE users SET fname=$2,age=$3 WHERE name=$1;`, [
            id,
            initUser.fname,
            initUser.age,
        ]);

        if (hasChanged && query.rowCount > 0) {
            res.status(201).json({ ok: true, msg: "Updated successfully" });
        } else if (!hasChanged) {
            res.status(400).json({ ok: false, msg: "No changes applied" });
        } else {
            res.status(400).json({ ok: false, msg: "An error occurred" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ ok: false, msg: err });
    }
});

module.exports = router;
