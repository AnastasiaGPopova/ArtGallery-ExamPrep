const Publication = require('../models/Publication.js')
const User = require('../models/User')
const publicationService = require('../services/publicationService')
const publicationUtility = require('../utils/publicationUtility')
const parser = require('../utils/parser')
const { isAuthenticated } = require('../middlewares/authMiddleware.js')



exports.getPublicationCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedPublication = async (req, res) => {
 const {title, technique , imgUrl, certificate } = req.body

    try{
        if(!title || !technique || !imgUrl || !certificate){
            throw new Error ("All fields are requiered!")
        }
        const newPublication = new Publication({title, technique , imgUrl, certificate, author: req.user._id})//encoded body-to, which we receive, will create a new cube
        //save newhotel
        await newPublication.save()
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors})
    }

}

exports.getDetails = async (req, res) => {

    let currentPublication = await publicationService.getOnePublication(req.params.publicId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                       .populate('usersShared') 
                                       .populate('author')
                                       .lean()


    if(!currentPublication){
     return res.redirect('/404')
    }

    const isLogged = req.authenticated
    

    if(isLogged){
    const isOwner = publicationUtility.isPublicationOwner(req.user, currentPublication)
    const isSharedAlready= await publicationUtility.isShared(req.user._id, req.params.publicId)
    res.render('details', {currentPublication, isOwner, isSharedAlready, isLogged})
} else {
    res.render('details', {currentPublication, isLogged})
}

}

exports.share = async (req,res) =>{
    const currentPublication = await publicationService.getOnePublication(req.params.publicId)
    const isOwner = publicationUtility.isPublicationOwner(req.user, currentPublication)

    if(isOwner){
        res.redirect('/')
    } else {
    currentPublication.usersShared.push(req.user._id)
    await currentPublication.save()
    res.redirect(`/${req.params.publicId}/details`)
    }

}



exports.getEditedPage = async (req,res) => {
    const currentPublication = await publicationService.getOnePublication(req.params.publicId).populate('author').lean()
    const isOwner = publicationUtility.isPublicationOwner(req.user, currentPublication)

    if(!isOwner){
        res.redirect('/')
    } else {
        res.render('edit', {currentPublication})
    }
}



exports.postEditedPublication = async (req,res) => {
    const {title, technique , imgUrl, certificate } = req.body

    try{
        if(!title || !technique || !imgUrl || !certificate){
            throw new Error ("All fields are requiered!")
        }
        const updated = await publicationService.update(req.params.publicId, {title, technique , imgUrl, certificate})//encoded body-to, which we receive, will create a new cube
        //redirect
        res.redirect(`/${req.params.publicId}/details`)

    } catch(error){
        const errors = parser.parseError(error)
        res.render('edit', {errors})
    }
}


exports.getDeletePublication= async (req, res) => {
    const publication = await publicationService.getOnePublication(req.params.publicId).populate('author').lean()
    const isOwner = publicationUtility.isPublicationOwner(req.user, publication)

    if(!isOwner){
        res.redirect('/')
    } else {
   const test = await publicationService.deletePublication(req.params.publicId)
   res.redirect('/')
    }
}

// exports.getAllMyPosts = async (req,res) => {
//     const allPosts = await publicationService.getAllPosts().populate('autor').lean()
//     const allMyPosts = allPosts.filter(x => x.autor._id == req.user._id)

    
//     res.render('myPost', {allMyPosts})
// }