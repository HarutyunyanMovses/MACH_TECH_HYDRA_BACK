// libs
const bcrypt = require("bcryptjs");
// mongodb
const User = require("../../models/usersTable/user");
//JWT
const { generateAccesToken } = require("..//helpers/generateAccesToken")

class LogInControler {
    async logIn(req, res) {
        console.log(req);
        try {
            const { email, password } = req.body;
            console.log( email, password );
            const user = await User.findOne({ email: email });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateAccesToken(user.email, user.roles);
                res.json({
                    jwt: { token, expiresIn: "240s" },
                    loggedUser_id: user._id
                });
            } else {
                return res
                    .status(401)
                    .json({ massage: `Acaunt  ${!user.email ? email : "pasword"} is not found` });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new LogInControler()