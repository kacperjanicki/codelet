const express = require("express");
const router = express.Router();
const pool = require("./db");
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

router.put("/:username/editProfile", verifyJWT, async (req, res) => {
    console.log(req.body);
    const { id, username } = req.body;

    try {
        let query = await pool.query(
            `
        UPDATE users SET name=$1 WHERE name=$2;
        `,
            [username, id]
        );
        res.status(201).json({ ok: true, msg: "Updated successfully" });
    } catch (err) {
        res.status(400).json({ ok: false, msg: err });
    }
});

module.exports = router;
