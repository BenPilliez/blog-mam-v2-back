const sequelize = require('sequelize')
const logger = require('./logger')


module.exports = {
    average: async (models, params, whereField, dbField) => {
        logger.debug("AVERAGE")

        try {
            const sum = await models.findAndCountAll({
                where: {
                    [whereField]: params
                },
                attributes: [[sequelize.fn('sum', sequelize.col(dbField)), 'sum']]
            })

            return sum.rows[0].dataValues.sum / sum.count

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    }
}
