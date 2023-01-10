const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

pool.query(
    `CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL CHECK (name <> ''),
                password VARCHAR(255) NOT NULL CHECK (password <> '')
            );`
).catch((err) => console.error(err));

// Signining up routes
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    let hashedPass = await bcrypt.hash(password, 10);
    let query = await pool
        .query("INSERT INTO users (name,password) VALUES($1,$2) RETURNING *;", [username, hashedPass])
        .catch((err) => {
            console.error(err);
            var msg;
            if (err.code === "23505") msg = "User already exists";
            if (err.code === "23514") msg = "Fields cannot contain empty values";
            var response = { msg: msg, ok: false };
            res.status(400).send(response);
        });
    if (query) res.status(201).send({ msg: "user created", ok: true });
});

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (token == "null") return res.send({ ok: false, msg: "no token found" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.send({ ok: false, msg: "Authentication failed" });
        req.userId = decoded.name;
        next();
    });
};

app.get("/isAuth", verifyJwt, (req, res) => {
    res.status(200).send({ ok: true, msg: "you are authenticated" });
});

//Log in route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let query = await pool.query(`SELECT name,password FROM users WHERE name=($1);`, [username]);
    if (query.rowCount > 0) {
        let queryRes = query.rows[0];
        console.log(query);
        let correctPass = await bcrypt.compare(password, queryRes.password);
        // console.log(queryRes);
        if (correctPass) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, {
                expiresIn: 3600,
            });
            res.status(200).send({ token: token, user: queryRes, ok: correctPass });
        } else if (!correctPass) res.status(403).send({ msg: "Incorrect credentials", ok: false });
    } else {
        res.status(400).send({ msg: "User not found", ok: false });
    }
});

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});
