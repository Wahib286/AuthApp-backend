const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try{
        const token = req.body.token;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token Missing"
            })
        }
    
        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            return res.status(400).json({
                success:false,
                message:"Token invalid"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
    next();
}

exports.isStudent = (req,res,next)=>{
   try{
    if(req.user.role !== "Student"){
        return res.status(401).json({
            success:false,
            message:"This rouute is for students"
        })
    }
   }

   catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
   }
   next();
}

exports.isAdmin = (req,res,next)=>{
    try{
     if(req.user.role !== "Admin"){
         return res.status(401).json({
             success:false,
             message:"This rouute is for Admin"
         })
     }
    }
 
    catch(error){
         return res.status(500).json({
             success:false,
             message:"User role is not matching"
         })
    }
    next();
 }