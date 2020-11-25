const logger = require('../helpers/logger')
const jwt = require('jsonwebtoken')
const models = require('../db/models')

module.exports = {
    signin: async (req, res) => {
        logger.debug("app => authController => signin");

        try {

            let user = await models.users.findOne({
                where: {
                    email: req.body.email
                },
                attributes: ['id', 'email', 'password', 'avatar', 'ROLES']
            });

            if (!user) {
                logger.debug("User incorrect")
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            if (!user.ROLES.includes('ROLES_ALL_ADMIN')) {
                logger.error("Pas les droits")
                return res.status(401).json({error: "Tu n'as pas accès à cette ressource"})
            }

            let password = user.validatePassword(req.body.password, user.password);

            if (!password) {
                logger.debug("Password incorrect")
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            let token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roles: user.ROLES
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h',
                    audience: process.env.AUDIENCE,
                    issuer: process.env.ISSUER
                }
            )

            return res.status(200).json({
                user:
                    {
                        id: user.id,
                        email: user.email,
                        avatar: user.avatar,
                    },
                token: token
            });

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    }
}
