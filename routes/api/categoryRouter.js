const router = require('express').Router()
const categoryController = require('../../controller/categoryController')

router.get('/', categoryController.get_category)
router.get('/:slug', categoryController.get_details_category)

module.exports = router
