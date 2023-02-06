const Publication = require('../models/Publication.js')
exports.isPublicationOwner = (user, pubcation) => {
    let isOwner = false
    if(user){
        if(user._id == pubcation.author._id){
            isOwner = true
        }
    }
   return isOwner
}



exports.isShared = async (userId, publicId) => {
    let isShared = false
    const publication = await Publication.findById(publicId)
    const shared = publication.usersShared.find(x=> x == userId )

    if(shared){
        isShared = true
    }
    return isShared
}