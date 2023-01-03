const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

pool.on("connect", (client) => {
    client
        .query(
            `CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE,
                email VARCHAR(255) UNIQUE

            );`
        )
        .catch((err) => console.error(err));
});

app.get("/", (req, res) => {
    pool.query("SELECT * FROM users;");
    res.send("simple endpoint");
});
// Signining up routes
app.post("/signup", async (req, res) => {
    const { username, email } = req.body;
    console.log(email);
    await pool.query("INSERT INTO users (name,email) VALUES($1,$2);", [username, email]);
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
