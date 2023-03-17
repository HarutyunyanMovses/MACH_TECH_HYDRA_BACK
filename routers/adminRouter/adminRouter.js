// libs
const { Router } = require("express");
const { check } = require("express-validator");
//middleware
const roleMiddleware = require("..//..//middleware/roleMiddleware")
// controler
const joinedsControler = require("..//..//controlers/joinedsControler");
// create router
const router = new Router();

//get joined users  ADMIN
router.get("/joineds",  joinedsControler.getJoinedUsers);
router.post("/join_to_hydra",
    [
        check("name", " Fill in the Name field").notEmpty(),
        check("lastname", " Fill in the Lastname field").notEmpty(),
        check("email", " Fill in the Email field").isEmail(),
        check(
            "phone",
            "phone must be more than 8 characters"
        ).notEmpty(),
    ], joinedsControler.saveJoined)

module.exports = router;