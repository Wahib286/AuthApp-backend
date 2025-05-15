const express  =  require("express");
const router = express.Router();

const {SignUp,login} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middleweres/auth");

router.post("/login", login);
router.post("/signup", SignUp);

//Protected Routes
router.get("/student", auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for Students"
    });
})

router.get("/admin", auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for Admin",
    });
})

//single middlewere
router.get("/test", auth, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for Test"
    });
})

module.exports = router;