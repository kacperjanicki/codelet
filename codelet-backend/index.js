const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const pool = require("./db");

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

app.get("/", (req, res) => {
    pool.query("SELECT * FROM users;");
    res.send("simple endpoint");
});
// Signining up routes
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    let query = await pool
        .query("INSERT INTO users (name,password) VALUES($1,$2) RETURNING *;", [username, password])
        .catch((err) => {
            console.error(err);
            var msg;
            if (err.code === "23505") msg = "User already exists";
            if (err.code === "23514") msg = "Fields cannot contain empty values";
            res.status(400).send(msg);
        });
    if (query) res.status(201).send({ msg: "user created" });
});

app.get("/login", async (req, res) => {
    const result = await pool.query("INSERT INTO users (name) VALUES($1) RETURNING *;", ["koles"]);
    console.log(result);

    res.redirect("/");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    res.send({ res: "login request" });
});

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});
