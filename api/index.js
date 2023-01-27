const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const quizRouter = require("./routes/quiz.js");
const userRouter = require("./routes/user.js");
const verifyJwt = require("./middleware/verifyJWT");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

pool.query(
    `CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL CHECK (name <> ''),
                password VARCHAR(255) NOT NULL CHECK (password <> ''),
                age INT NOT NULL);
    CREATE TABLE IF NOT EXISTS quizgames (
        id SERIAL PRIMARY KEY,
        player_id INT NOT NULL,
        score INT NOT NULL,
        callback JSONB NOT NULL,
        questions JSONB NOT NULL,
        date TIMESTAMP,
        public BOOLEAN NOT NULL,
        CONSTRAINT fk_author FOREIGN KEY(player_id) REFERENCES users(user_id));
    CREATE TABLE IF NOT EXISTS quizes (
        id SERIAL PRIMARY KEY,
        no VARCHAR(255) NOT NULL CHECK (no <> ''),
        lang VARCHAR(255) NOT NULL CHECK (lang <> ''),
        public BOOLEAN NOT NULL,
        questions JSONB NOT NULL);`
).catch((err) => console.error(err));

app.use("/quiz", quizRouter);
app.use("/user", userRouter);

// Signining up routes
app.post("/signup", async (req, res) => {
    const { username, password, age } = req.body;
    let hashedPass = await bcrypt.hash(password, 10);

    let query = await pool
        .query("INSERT INTO users (name,password,age) VALUES($1,$2,$3) RETURNING *;", [
            username,
            hashedPass,
            age,
        ])
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

app.get("/isAuth", verifyJwt, (req, res) => {
    res.status(200).send({ ok: true, msg: "you are authenticated" });
});

//dont look at this, couldnt get this working otherwise ;/
app.get("/insert", async (req, res) => {
    let questions = [
        {
            question: "What will be the output?",
            code: "x=[i-1 for i in range(1,10)]\nprint(x)",
            options: [
                {
                    choice: "A",
                    answer: "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
                },
                {
                    choice: "B",
                    answer: "0 1 2 3 4 5 6 7 8 9",
                },
                {
                    choice: "C",
                    answer: "0 1 2 3 4 5 6 7 8",
                },
                {
                    choice: "D",
                    answer: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
                },
            ],
            correct: "A",
        },
        {
            question: "What will this code produce?",
            code: "name='jAck'\nname = name.capitalize()\nprint(name)",
            options: [
                {
                    choice: "A",
                    answer: "JACK",
                },
                {
                    choice: "B",
                    answer: "jack",
                },
                {
                    choice: "C",
                    answer: "Jack",
                },
                {
                    choice: "D",
                    answer: "JAck",
                },
            ],
            correct: "A",
        },
        {
            question: "What will be the output?",
            code: "x = [1,2,3]\ny=x\ny[1] = 4\nprint(x)",
            options: [
                {
                    choice: "A",
                    answer: "[1,2,3]",
                },
                {
                    choice: "B",
                    answer: "[4,2,3]",
                },
                {
                    choice: "C",
                    answer: "[1,4,3]",
                },
                {
                    choice: "D",
                    answer: "[1,2,4]",
                },
            ],
            correct: "A",
        },
    ];
    let query = await pool.query(
        `INSERT INTO quizes(no,lang,public,questions) VALUES('001','python',TRUE,$1);`,
        [{ questions: questions }]
    );
    res.send(query);
});

//Log in route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let query = await pool.query(`SELECT name,password,age FROM users WHERE name=($1);`, [username]);
    if (query.rowCount > 0) {
        let userIdQuery = await pool.query(`SELECT user_id FROM users WHERE name=($1)`, [query.rows[0].name]);
        let userId = userIdQuery.rows[0].user_id;
        query.rows[0].id = userId;

        let queryRes = query.rows[0];
        let correctPass = await bcrypt.compare(password, queryRes.password);
        if (correctPass) {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: 3600,
            });

            res.status(200).send({ token: token, user: queryRes, ok: correctPass });
        } else if (!correctPass) res.status(403).send({ msg: "Incorrect credentials", ok: false });
    } else {
        console.log(username, password);
        res.status(400).send({ msg: "User not found", ok: false });
    }
});

app.get("/getProfileInfo", async (req, res) => {
    let requestedUser = req.query.usr;
    let query = await pool.query(`SELECT * FROM users WHERE name=$1;`, [requestedUser]);

    if (query.rows.length > 0) {
        let user_id = query.rows[0].user_id;
        let games = await pool.query(`SELECT * FROM quizgames WHERE player_id=$1;`, [user_id]);
        let userObject = query.rows[0];
        userObject.games = games.rows;

        res.status(200).json({ res: userObject, err: false });
    } else {
        res.status(404).json({ msg: "User not found", err: true });
    }
});

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});
