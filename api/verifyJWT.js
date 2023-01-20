const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (token == "null") return res.send({ ok: false, msg: "no token found" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.send({ ok: false, msg: "Authentication failed" });
        req.userId = decoded.name;
        next();
    });
};
