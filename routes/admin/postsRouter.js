const router = require('express').Router()
const postsController = require('../../controller/postsController')

router.post('/', postsController.create_post)
router.put('/:id', postsController.update_post)
router.delete('/:id', postsController.delete_post)

module.exports = router
