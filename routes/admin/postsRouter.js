const router = require('express').Router()
const postsController = require('../../controller/postsController')

router.post('/', postsController.create_post)
router.get('/', postsController.get_posts)
router.get('/:slug', postsController.get_details_posts)
router.put('/:id', postsController.update_post)
router.put('/published/:id', postsController.update_published_value)
router.delete('/:id', postsController.delete_post)

module.exports = router
