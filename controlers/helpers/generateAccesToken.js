//libs
const jwt = require("jsonwebtoken");
//secret
const SECRET = require("../../config");

const generateAccesToken = (email, roles) => {
    const payload = {
        email,
        roles,
    };
    return jwt.sign(payload, SECRET.SECRET.secret, { expiresIn: "240s" });
};

async function refreshToken(req, res) {
    try {
        const reqToken = req.headers.authorization.split(" ")[1];
        const decodeData = jwt.verify(reqToken, SECRET.SECRET.secret);
        const token = generateAccesToken(decodeData.email, decodeData.roles);
        res.json({
            jwt: { token, expiresIn: "240s" },
        });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ massage: "miban sxal es are" });
    }
}

module.exports = { generateAccesToken, refreshToken }