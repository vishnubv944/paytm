const usersRouter = require("./user")
const accountsRouter = require("./account")
const express = require('express');


const router = express.Router();


router.use('/user', usersRouter)

router.use('/account', accountsRouter)


module.exports = router



