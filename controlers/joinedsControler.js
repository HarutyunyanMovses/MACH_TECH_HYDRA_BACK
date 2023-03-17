const JoinedSchame = require("..//models/joinedTable/joinedSchame")
const Role = require("..//models/usersTable/role")
const { validationResult } = require("express-validator");


class JoinedsControler {

    async saveJoined(req,res){
        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ massage: "registration errors", errors });
                };
                const { email } = req.body;
                const condidate = await JoinedSchame.findOne({ email });
                if (condidate) {
                    return res.status(400).json({ massage: "User already exists" });
                };
                const rolee = await Role.findOne({ value: "USER" });
                req.body.roles = rolee.value;
                const user = new JoinedSchame(req.body);
                const saved = await user.save();
                return res.json({
                    joinedUser_id: saved._id
                });
        } catch (error) {
            res.status(501).json({ message: "error from beckend" })
            console.log(error);
        }
    }

    async getJoinedUsers(req, res) {
        try {
            const data = await JoinedSchame.find({})
            res.json(data)
        } catch (error) {
            res.status(501).json({ message: "error from beckend" })
        }
    }

}


module.exports = new JoinedsControler()