const express  =  require("express");
const router = express.Router();

const {SignUp} = require("../controllers/Auth");

// router.post("/login", login);
router.post("/signup", SignUp);

module.exports = router;