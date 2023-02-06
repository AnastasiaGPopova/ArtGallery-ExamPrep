const User = require('../models/User.js')
const jwt = require('../lib/jsonwebtoken.js')
const config = require('../configurations/configPorts')


exports.getUserByEmail =  (email) => User.findOne({email})
exports.getUserByUsername =  (username) => User.findOne({username})

exports.register = async (username, password, address) => {
   const newUser = await User.create({username, password, address})
   const payLoad = {_id: newUser._id, username: newUser.username, address: newUser.address}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token
} 

exports.login = async (existingUser, password) => {
   const isValid = await existingUser.validatePassword(password)

   if(!isValid){
      throw new Error("Invalid username or password!")
   }
  
   const payLoad = {_id: existingUser._id, username: existingUser.username, address: existingUser.address}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token
}
