const mongoose = require('mongoose')

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        //minLength: [6, "Too short! Title should be at least 6 characters !"]
    }, 
    technique : {
        type: String,
        required: true,
        //minLength: [6, "Too short! Keyword should be at least 6 characters !"]
    },
    imgUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }
    },

    certificate: {
        type: String,
        required: true,
        // options: [{ 
        //     key: yes, 
        //     value: ["Yes", `Accepts only "Yes" or "No"!`]
        //   }, { 
        //     key: no, 
        //     value: ["No", `Accepts only "Yes" or "No"!`]
        //   }]
        //minLength: [10, "Date should be 10 characters !"],
        //maxLength: [10, "Date should be 10 characters !"]
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // createdAt: {
    //     type: Date, default: Date.now
    // },
    usersShared:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
})

const Publication = mongoose.model('Publication', publicationSchema)
module.exports = Publication