const router = require('express').Router()
const usersController = require('../../controller/usersController')


router.get('/', usersController.get_users)
router.get('/:id', usersController.get_details)
router.post('/', usersController.create_user_admin)
router.put('/:id', usersController.update_user)
router.put('/password/:id', usersController.update_user_password)
router.delete('/', usersController.delete_user)

module.exports = router
