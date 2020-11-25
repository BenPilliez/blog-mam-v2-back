const models = require('../db/models')
const logger = require('../helpers/logger')

module.exports = {

    update_rate: async (req, res) => {
        logger.debug("app => ratesController => update_rate")

        try {

            const rate = await models.rates.findByPk(req.params.id)

            rate.update({
             rate: req.body.rate + rate.rate,
             nb_rates: rate.nb_rates + 1
            })

            return res.json(rate)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    }

}
