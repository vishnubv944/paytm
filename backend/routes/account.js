const express = require('express')
const authMiddleware = require('../middleware')
accountRouter = express.Router()
const {Users, Accounts} = require('../db')
const mongoose = require('mongoose')


accountRouter.get('/balance', authMiddleware, async (req, res) =>{
    userid = req.body.userid.userid
    console.log("Userid: ------------------------------------------------------>", userid)
    const account = await Accounts.findOne({userid: userid})

    const data = await Users.findById(userid)

    if(account){
        res.status(200).json({balance: account.balance, firstName: data.firstName})
    }
})


accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    toUserId = req.body.to,
    fromUserId = req.body.userid.userid,
    amount = req.body.amount
    const session = await mongoose.startSession()
    session.startTransaction()
    fromUser = await Accounts.findOne({userid: fromUserId})
    if(!fromUser || fromUser.balance < amount){
        session.abortTransaction()
        return res.status(400).json({"message": "Insufficient Balance"})
    }
    toUser = await Accounts.findOne({userid: toUserId})

    if(!toUser){
        session.abortTransaction()
        return res.status(400).json({"message": "User do not exist"})
    }

    await Accounts.updateOne({userid: fromUserId}, {$inc: {
        balance: -amount
    }}).session(session);

    await Accounts.updateOne({userid: toUserId}, {$inc: {
        balance: amount
    }}).session(session);


    session.commitTransaction()
    
    res.status(200).json({"message": "Transfer Successful"})

    
})


module.exports =  accountRouter



/*
Vish Nuuuuuu eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NWM4NmE1NWMzNDdiNWNjM2NmZjgxMTEiLCJpYXQiOjE3MDc2MzMyMzd9.t-Hn0mINTFEf9qkPQVX3mE1vRY3FoHqTwPrLdBpz3eA



*/