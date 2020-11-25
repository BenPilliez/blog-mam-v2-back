const router = require('express').Router()
const categoryController = require('../../controller/categoryController')

router.get('/', categoryController.get_category)
router.get('/:slug', categoryController.get_details_category)
router.post('/', categoryController.create_category)
router.put('/:id', categoryController.update_category)
router.delete('/:id', categoryController.delete_category)

module.exports = router
