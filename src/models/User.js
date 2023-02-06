const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, "Username should be at least 3 characters long!"]
    },
    password: {
        type: String,
        required: true,
        minLength: [3, "Password should be at least 3 characters long!"]
    },
    address: {
        type: String,
        required: true,
        maxLength: [20, "Address should be max 20 characters long!"]
    //     match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     minLength: [3, 'Email should be at least 3 charecters!']
    },
    myPublications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }]
 })

 userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
           .then(hash => {
            this.password = hash
            next()
           })
 })

 userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password) //this.password is the encrypted password. Password is the password that the user is giving
    
})

 const User = mongoose.model('User', userSchema)
 module.exports = User