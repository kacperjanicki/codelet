const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send("simple endpoint");
});
app.post("/login", (req, res) => {
    console.log(req.body);
    res.send({ res: "login request" });
});

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});
