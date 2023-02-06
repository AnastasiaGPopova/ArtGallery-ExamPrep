const Publication = require('../models/Publication')

exports.getOnePublication = (publicId) => Publication.findById(publicId)
exports.getAllPublications = () => Publication.find()
exports.update = (publicId, data) => Publication.findByIdAndUpdate(publicId, data, {runValidators: true})
exports.deletePublication = (publicId) => Publication.findByIdAndDelete(publicId, {runValidators: true})
