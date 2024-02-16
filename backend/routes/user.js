const express = require('express')
const JWT_SECRET = require('../config')
const userRouter = express.Router();
const {UserSignupSchema, UserSigninSchema} = require('../validation')
const {Users, Accounts} = require('../db')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const authMiddleware = require('../middleware')


userRouter.post('/signup', async (req, res)=>{
    
    username = req.body.username
    firstName = req.body.firstName
    lastName = req.body.lastName
    password = req.body.password

    vlidation = UserSignupSchema.safeParse({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })

    findUser = await Users.findOne({username: username})

    if(!vlidation.success || findUser){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    else{
        const newUser = await Users.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,    
        });
        console.log("User id ================>",newUser)
        const userid = newUser._id.toString()
        
        const newAccount = new Accounts({
            userid: userid,
            balance: 10000
        })

        const token = jwt.sign({userid: userid}, JWT_SECRET);
        
        try{
            await newAccount.save()

            newUser.save().then(savedUser => {
                res.status(200).json({
                    message: "User created successfully",
                    token: token
                })
            })
        }
        catch(error){
            console.error(err);
        }
        
    }

})


userRouter.post('/signin', async (req, res) => {
    username = req.body.username
    password = req.body.password


    vlidation = UserSigninSchema.safeParse({
        username: req.body.username,
        password: req.body.password
    })

    if(!vlidation){
        return res.status(411).json({"message": "Error while logging in"})
    }

    const findUser = await Users.findOne({username: username})
    if(findUser && findUser.password == password){
        
        const token = jwt.sign(findUser._id.toString(), JWT_SECRET);
        return res.status(200).json({"token": token})
        
    }
    res.status(411).json({"message": "Error while logging in"})
})


userRouter.put('/', authMiddleware,async (req, res) => {
    password = req.body.password
    firstName = req.body.firstname
    lastName = req.body.lastname
    userObjectId = req.body.userid

    user = await Users.findById(userObjectId).exec()

    if(password != undefined){
        user.password = password
    }
    if(firstName != undefined){
        user.firstName = firstName
    }
    if(lastName != undefined){
        user.lastName = lastName
    }

    try{
        user.save()
    }
    catch(error){
        console.log(error)
        res.status(411).json({"message": "Error while updating information"})
    }

    res.status(200).json({"message": "Updated successfully"})
    
})


userRouter.get('/bulk', authMiddleware, async (req, res) => {
    filter = req.query.filter
    try {
        
        const result = await Users.find({
            $or:[{
                    firstName: {
                        "$regex": filter
                    }
                },
                {
                    lastName: {
                        "$regex": filter
                    }
                }

            ]}
        )
        responseArray = result.map((data) => {
            return {
                firstName: data.firstName,
                lastName: data.lastName,
                _id: data._id.toString()
            }
        })

        res.status(200).json({
            users: responseArray
        })
      } catch (findErr) {
        console.error('Error finding documents:', findErr);
      } 

})


module.exports = userRouter




/*
Test Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NWM4MzBlNzU5YzBlNDk2YzY1MzYwYTMiLCJpYXQiOjE3MDc2MTg1MzV9.WfmrABcmEppuP6wzEX0nvz9kWld6Dv4zCuwd-Y0oQcw

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NWM4NjE2ODRjYmUyMzJiMWM1OGM1Y2EiLCJpYXQiOjE3MDc2MzA5NTJ9.vJL-JaayyXiNwNEMifMDHbiuyCrLJsMSHr7qcSY4Tc0



*/


