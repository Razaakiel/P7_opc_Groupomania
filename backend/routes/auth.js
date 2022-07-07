const express   = require("express");
const router    = express.Router();
const authCtrl  = require("../controllers/auth");

router.post("/signup", authCtrl.signup);   // signup / inscription
router.post("/login", authCtrl.login);    // login /  connexion

module.exports = router;