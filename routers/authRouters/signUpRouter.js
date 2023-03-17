// libs
const { Router } = require("express");
const { check } = require("express-validator");
// controler
const signUpControler = require("../../controlers/logIn_and_signUp_controlers/signUpControler");
// create router
const router = new Router();

router.post(
    "/signup",
    [
        check("name", " Fill in the Name field").notEmpty(),
        check("lastname", " Fill in the Lastname field").notEmpty(),
        check("email", " Fill in the Email field").isEmail(),
        check(
            "password",
            "Password must be more than 4 and less than 10 characters"
        ).isLength({ min: 4, max: 10 }),
    ],
    signUpControler.signUp
);

module.exports = router;