//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const publicationController = require('./controllers/publicationController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------


router.get('/', homeController.getHomePage)
// router.get('/post/allPosts', homeController.getAllPostsPage)


//Login and Register
router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


//Publication creation
router.get('/create', isAuthenticated, publicationController.getPublicationCreationPage)
router.post('/create', isAuthenticated, publicationController.postCreatedPublication)

//ArtGallary-All Publications
router.get('/gallery', homeController.getAllPublications)

//Details Page
router.get('/:publicId/details', publicationController.getDetails)

//Share
router.get('/:publicId/share', isAuthenticated, publicationController.share)

//Edit page
router.get('/:publicId/edit', isAuthenticated, publicationController.getEditedPage)
router.post('/:publicId/edit', isAuthenticated, publicationController.postEditedPublication)

//Delete post
router.get('/:publicId/delete', isAuthenticated, publicationController.getDeletePublication)

//MyProfile
router.get('/profile', isAuthenticated, homeController.getProfilePage)


router.get('/logout', authController.logout)
router.get('*', homeController.getErrorPage404)
router.get('/404', homeController.getErrorPage404)



module.exports = router