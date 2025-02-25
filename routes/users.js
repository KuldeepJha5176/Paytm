const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User  = require("../db")
const { JWT_SECRET } = require("../config");
const router = express.Router();

const signupBody = Zod.object({
    username:Zod.string().email(),
    password:Zod.string().min(8),
    firstName:Zod.string().max(20),
    lastName:Zod.string().max(15),
})

router.post("/signup",async(req,res)=>{
    const { success } = signupBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Invalid request body",
        })
    }

    const existingUser = await User.findOne({username:req.body.username});
    if(existingUser){
        res.status(409).json({
            message:"User already exists",
        })
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = await User.create({
        username:req.body.username,
        password:hashedPassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
    })
    const userId = user._id;
    const token  = jwt.sign({
        userId
    },JWT_SECRET);

    res.status(201).json({
        message:"User created successfully",
        token:`Bearer ${token}`,
        userId
    })

})

const signinBody = Zod.object({
    username:Zod.string().email(),
    password:Zod.string().min(8),
})

router.post("/signin",async(req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Email already taken / Incorrect inputs "
        })
    }
    const user = await User.findOne({username:req.body.username});
    if(!user){
        res.status(404).json({
            message:"User not found"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect){
        res.status(401).json({
            message:"Incorrect password"
        })
    }
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        token: token
    }) 
    return;

})
    

module.exports = router;