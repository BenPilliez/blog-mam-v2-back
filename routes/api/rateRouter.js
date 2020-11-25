const router = require('express').Router()
const rateController = require('../../controller/rateController')

router.put('/:id', rateController.update_rate)

module.exports = router
