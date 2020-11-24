const router = require('express').Router()
const postsController = require('../../controller/postsController')

router.get('/', postsController.get_posts)
router.get('/:slug', postsController.get_details_posts)

module.exports = router
