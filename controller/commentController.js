const models = require('../db/models')
const logger = require('../helpers/logger')
const {getPagingData} = require('../helpers/getPagingData')


module.exports = {

    get_comments: async (req, res) => {
        logger.debug("app => commentController => get_comments")
        try {

            const limit = parseInt(req.query.perPage) || 10
            const page = parseInt(req.query.page) || 0
            const offset = limit * page

            const comments = await models.comments.findAndCountAll({
                where: {
                    postsId: req.body.postsId
                },
                limit: limit,
                offset: offset
            })

            if (comments.count === 0) {
                return res.sendStatus(404)
            }

            const commentsData = getPagingData(comments, page, limit)

            return res.json(commentsData)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    post_comments: async (req, res) => {
        logger.debug("app => commentsController => posts_comments")

        try {

            const comment = await models.comments.create({
                usersId: req.user.id,
                postsId: req.body.postsId,
                content: req.body.content
            })

            return res.json(comment)

        } catch (e) {
            logger.debug("app => commentsController => posts_comments")
            return res.statu(500).json({error: e})
        }
    },

    reply_comments: async (req, res) => {
        logger.debug("app => commentsController => reply_comments")

        try {
            const comment = await models.comments.create({
                usersId: req.user.id,
                postsId: req.body.postsId,
                content: req.body.content,
                commentsId: req.body.commentsId
            })

            return res.json(comment)

        } catch (e) {
            logger.erro(e)
            return res.status(500).json({error: e})
        }
    },

    update_comment: async (req, res) => {
        logger.debug('app => commentsController => update_comment')

        try {

            const comment = await models.comments.findOne(
                {
                    where: {
                        id: req.params.id
                    },
                    include: {
                        model: models.comments,
                        as: 'Children'
                    }
                }
            )
            if (!comment) {
                return res.sendStatus(404)
            }

            comment.update(req.body)
            return res.json(comment)
        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    set_published: async (req,res) => {
        logger.debug('app => commentsController => set_published')

        try{
            const comment = await models.comments.findByPk(req.params.id)
            comment.update({
                published: true
            })

            return res.json(comment)
        }catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    delete_comment: async(req,res)=> {
        logger.debug("app => commentsController => delete_comment")
        try{
            const comment = await models.comments.findByPk(req.params.id)

            if(!comment){
                return res.sendStatus(404)
            }

            await comment.destroy()

            return res.sendStatus(200)

        }catch(e){
            logger.error(e)
            return res.status(500).json({error: e})
        }
    }

}
