const router = require('express').Router()
const categoryController = require('../../controller/categoryController')

router.post('/', categoryController.create_category)
router.put('/:id', categoryController.update_category)
router.delete('/:id', categoryController.delete_category)

module.exports = router
