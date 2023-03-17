// libs
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
// mongodb
const User = require("../../models/usersTable/user");
const Role = require("../../models/usersTable/role");
//JWT
const { generateAccesToken } = require("..//helpers/generateAccesToken")


class SignUpControler {
    async signUp(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ massage: "registration errors", errors });
            };
            const { email, password } = req.body;
            const condidate = await User.findOne({ email });
            if (condidate) {
                return res.status(400).json({ massage: "User already exists" });
            };
            const heshPassword = bcrypt.hashSync(password, 7);
            req.body.password = heshPassword;
            const rolee = await Role.findOne({ value: "USER" });
            req.body.roles = rolee.value;
            const user = new User(req.body);
            const token = generateAccesToken(user.email, user.roles);
            const saved = await user.save();
            return res.json({
                jwt: { token, expiresIn: "240s" },
                loggedUser_id: saved._id
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                massage: "SignUp error",
            });
        };
    };
}

module.exports = new SignUpControler()