const logger = require('../helpers/logger')
const models = require('../db/models')
const {getPagingData} = require('../helpers/getPagingData')


module.exports = {
    get_category: async (req, res) => {
        logger.debug("app => categoryController => get_category")
        try {

            let query = {order: [req.query.order]};


            const limit = parseInt(req.query.perPage) || 10
            const page = parseInt(req.query.page) || 0
            const offset = limit * page

            if (req.query.perPage && req.query.page) {
                query['limit'] = limit;
                query['offset'] = offset
            }

            const categories = await models.category.findAndCountAll(query)

            if (categories.count === 0) {
                return res.status(404).json("Aucune catégorie")
            }

            const categoriesData = getPagingData(categories, page, limit)

            return res.json(categoriesData)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    get_details_category: async (req, res) => {
        logger.debug('app => categoryController => get_details_category')
        try {

            const include = req.query.include
            const query = {
                where: {slug: req.params.slug},
                include: null
            }
            if (include) {
                query.include = [
                    {
                        model: models.posts
                    }
                ]
            }

            const category = await models.category.findOne(query)

            if (!category) {
                return res.sendStatus(404)
            }

            return res.json(category)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    create_category: async (req, res) => {
        logger.debug("app => categoryController => create_category")
        try {

            const category = await models.category.create(req.body)

            return res.json(category)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    update_category: async (req, res) => {
        logger.debug('app => categoryController => update_category')
        try {
            let category = await models.category.findByPk(req.params.id)

            if (!category) {
                return res.sendStatus(400)
            }

            await category.update(req.body)
            return res.json(category)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    delete_category: async (req, res) => {
        logger.debug("app => categoryController => delete_category")
        try {


            await models.category.destroy({
                where: {
                    id: req.body.id
                }
            })
            return res.sendStatus(200)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    }

}
