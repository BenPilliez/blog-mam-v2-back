const router = require('express').Router()
const postsController = require('../../controller/postsController')
const {checkRoleAndOwner}= require('../../helpers/authHelper')


router.post('/',checkRoleAndOwner, postsController.create_post)
router.get('/',checkRoleAndOwner, postsController.get_posts)
router.get('/:slug',checkRoleAndOwner, postsController.get_details_posts)
router.put('/:id',checkRoleAndOwner, postsController.update_post)
router.put('/published/:id',checkRoleAndOwner, postsController.set_published)
router.delete('/:id',checkRoleAndOwner, postsController.delete_post)

module.exports = router
