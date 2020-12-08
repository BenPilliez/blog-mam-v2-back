const router = require('express').Router()
const commentsController = require('../../controller/commentController')

router.get('/', commentsController.get_comments)
router.post('/', commentsController.post_comments)
router.post('/reply', commentsController.reply_comments)
router.put('/:id', commentsController.update_comment)
router.delete('/', commentsController.delete_comment)

module.exports = router

