const express = require("express");
const router = express.Router();
const pool = require("./db");
const personalAction = require("./personalAction");
const verifyJWT = require("./verifyJWT");

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

router.put("/:id/editProfile", verifyJWT, personalAction, async (req, res) => {
    const { username } = req.body;
    const { id } = req.params;

    console.log(id);

    try {
        let query = await pool.query(
            `
        UPDATE users SET name=$1 WHERE name=$2;
        `,
            [username, id]
        );
        console.log(req.body);
        if (query.rowCount > 0) {
            res.status(201).json({ ok: true, msg: "Updated successfully" });
        } else {
            res.status(400).json({ ok: false, msg: "An error occurred" });
        }
    } catch (err) {
        res.status(400).json({ ok: false, msg: err });
    }
});

module.exports = router;
