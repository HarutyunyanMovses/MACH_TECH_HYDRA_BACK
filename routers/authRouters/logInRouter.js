// libs
const { Router } = require("express");
//middleware
const authMiddleware = require("..//..//middleware/authMiddleware")
// controler
const logInControler = require("../../controlers/logIn_and_signUp_controlers/logInControler");
//refresh jwt
const {refreshToken} = require("..//..//controlers/helpers/generateAccesToken")
// create router
const router = new Router();

//login
router.post("/login", logInControler.logIn);
// refresh jwt web token 
router.get("/refreshtoken", authMiddleware, refreshToken);

module.exports = router;