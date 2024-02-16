const mongoose = require('mongoose')


try{
    mongoose.connect('mongodb+srv://vishnubv944:<PASSWORD>@cluster0.30sovri.mongodb.net/paytm');

    dbConnection = mongoose.connection
    
    dbConnection.on('connected', () =>{
        if (mongoose.connection.readyState === 1) {
            console.log('Mongoose is connected');
          } else {
            console.log('Mongoose is not connected');
          }
    })

    dbConnection.on('disconnected', () =>{
        console.log('Mongoose disconnected');
    })

} catch(error){
    console.log("error in connecting to database")
    console.log(error)
}



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    }
});

const accountsSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    balance:{
        type: Number,
        
    }
})


const Users = mongoose.model('Users', userSchema);
const Accounts = mongoose.model('Accounts', accountsSchema);

module.exports = {Users, Accounts}
