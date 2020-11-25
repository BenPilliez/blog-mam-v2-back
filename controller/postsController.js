const logger = require('../helpers/logger')
const models = require('../db/models')
const {getPagingData} = require('../helpers/getPagingData')


const DEFAUlT_PHOTOS = ['nature.jpg', 'foret.jpg', 'prairie.jpg']
const INCLUDE = [
        {
            model: models.rates
        },
        {
            model: models.category
        }]


module.exports = {
    get_posts: async (req, res) => {
        logger.debug('app => postsController => get_posts')

        try {

            const limit = parseInt(req.query.perPage) || 10
            const page = parseInt(req.query.page) || 0
            const offset = limit * page

            query = {
                where: {},
                include:INCLUDE,
                limit: limit,
                offset: offset
            }

            if (req.baseUrl.includes('/api')) {
                query.where = {published: true}
            }

            const posts = await models.posts.findAndCountAll(query)

            if (posts.count === 0) {
                return res.status(404).json("Aucun posts")
            }

            const postsData = getPagingData(posts, page, limit)

            return res.json(postsData)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    get_details_posts: async (req, res) => {
        logger.debug('app => postsController => get_details_posts')

        try {

            const post = await models.posts.findOne({
                where: {
                    slug: req.params.slug
                },
                include: INCLUDE
            })

            if (!post) {
                return res.status(404).json('Aucun post')
            }

            return res.json(post)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    create_post: async (req, res) => {
        logger.debug("app => postsController => create_post")
        try {
            const body = req.body

            if (req.files && req.files.length > 0) {

                body['photos'] = post.photos

                req.files.map((file) => {
                    body['photos'] = [...body['photos'], file.filename]
                })
            } else {
                body['photos'] = DEFAUlT_PHOTOS
            }

            body['rate'] = {
                rate: 0,
                nb_rates: 0
            }
            body['usersId'] = req.user.id

            const post = await models.posts.create(body, {
                include: [{model: models.rates}],
            })

            return res.json(post)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    update_post: async (req, res) => {
        logger.debug("app => postsController => update_post")

        try {

            const post = await models.posts.findByPk(req.params.id,{
                include: INCLUDE
            })

            if (!post) {
                return res.status(404).json("Aucun post")
            }

            const body = req.body
            body['photos'] = post.photos


            if (req.files && req.files.length > 0) {
                req.files.map((file) => {
                    body['photos'] = [...body['photos'], file.filename]
                })
            }

            await post.update(req.body)
            return res.json(post)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    delete_post: async (req, res) => {
        logger.debug('app => postsController => delete_post')
        try {
            const post = await models.posts.findByPk(req.params.id)

            if (!post) {
                return res.sendStatus(404)
            }

            await post.destroy()
            return res.sendStatus(200)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    update_published_value: async (req, res) => {
        logger.debug('app => postsController => update_published_value ')

        try {

            let post = await models.posts.findByPk(req.params.id)

            if (!post) {
                return res.sendStatus(404)
            }

            await post.update({
                published: req.body.published
            })

            return res.json(post)

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e})
        }
    }
}
