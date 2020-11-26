const router = require('express').Router()
const commentController = require('../../controller/commentController')
const {checkRoleAndOwner}= require('../../helpers/authHelper')


router.put('/published/:id',checkRoleAndOwner, commentController.set_published)


module.exports = router
