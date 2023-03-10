//const Post = require('../models/Post.js')
const Publication = require('../models/Publication')
const User = require('../models/User')
const { all } = require('../routes')
const publicationService = require('../services/publicationService')


exports.getHomePage = async (req, res) => {
        const allPublications = await publicationService.getAllPublications().lean()
        res.render('home', {allPublications})
}


exports.getAllPublications = async (req, res) => {
        const getAllPublications = await publicationService.getAllPublications().lean()
        res.render('gallery', {getAllPublications})
}


exports.getProfilePage = async (req,res) => {
    const currentUser = await User.findById(req.user._id).lean()
    const publicationsSharedByUser = await Publication.find({usersShared: req.user._id}).lean()
    console.log(publicationsSharedByUser)
    const publicationsByUser = await Publication.find({author: req.user._id}).lean()
    console.log(publicationsByUser)

    let shared = publicationsSharedByUser.map(h => h.title)
    let publicated = publicationsByUser.map(h => h.title)

    let isShared = false
    let isPublicated = false

    if(shared.length > 0){
        isShared = true
    }

    if(publicated.length > 0){
        isPublicated = true
    }
    shared = shared.join(', ')
    publicated = publicated.join(', ')


    res.render('profile', {currentUser, shared, publicated, isShared, isPublicated})

}

exports.getAboutPage = (req,res) => {
    res.render('about')
}

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}