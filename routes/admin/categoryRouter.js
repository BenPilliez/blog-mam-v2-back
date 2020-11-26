const router = require('express').Router()
const categoryController = require('../../controller/categoryController')
const {checkRoleAndOwner}= require('../../helpers/authHelper')

router.get('/',checkRoleAndOwner, categoryController.get_category)
router.get('/:slug',checkRoleAndOwner, categoryController.get_details_category)
router.post('/',checkRoleAndOwner, categoryController.create_category)
router.put('/:id',checkRoleAndOwner, categoryController.update_category)
router.delete('/:id',checkRoleAndOwner, categoryController.delete_category)

module.exports = router
