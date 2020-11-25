const router = require('express').Router()
const authController = require('../../controller/authController')

router.post('/signin', authController.signin)

module.exports = router
