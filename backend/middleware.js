const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./config')
function authMiddleware(req, res, next){

    authCode = req.headers['authorization'].split(' ')[1]
    //console.log(authCode)
    jwt.verify(authCode, JWT_SECRET, (err, token)=>{
        //console.log("token: ",token)
        if(err){
            return res.status(403).json({})
        }
        else{
            req.body.userid = token
            next()
        }
    })
        


}

module.exports = authMiddleware