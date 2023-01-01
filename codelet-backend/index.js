const express = require("express");
const app = express();
const PORT = "";
app.get("/", (req, res) => {
    res.send("simple endpoint");
});

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});
