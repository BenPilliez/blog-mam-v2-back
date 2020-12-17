const models = require("../db/models");
const logger = require("../helpers/logger");
const {average} = require("../helpers/rateAverage");

module.exports = {
    get_rate_post: async (req, res) => {
        logger.debug("app => ratesController => get_rate_post");
        try {

            const averageRate = await average(models.rates, req.params.id, "postsId", "rate");

            return res.json(averageRate);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    },
    post_rate: async (req, res) => {
        logger.debug("app => ratesController => post_rate");

        try {

            const rate = await models.rates.findOrCreate({
                where: {
                    usersId: req.user.id,
                    postsId: req.params.id
                },
                defaults: {
                    rate: req.body.rate,
                    postsId: req.params.id,
                    usersId: req.user.id
                }
            });

            if (rate[1] === false) {
                return res.status(400).json({error: "Tu as déjà voté"});
            }

            rate[0].dataValues.average = await average(models.rates, req.params.id, "postsId", "rate");

            return res.json(rate);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    }

};
