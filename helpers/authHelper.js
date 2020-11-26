const jwt = require('jsonwebtoken')
const logger = require('./logger')

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    verifToken: (req, res, next) => {
        logger.debug('app => helper => verifToken');
        try {

            let token = req.headers.authorization
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length)
            } else {
                return res.status(400).json({error: 'Jwt mal formé'})
            }

            req.user = jwt.decode(token, process.env.JWT_SECRET);
            next()

        } catch (err) {
            logger.error(err);
            res.status(401).json({error: 'Tu dois authentifié pour accéder à cette ressource'})

        }
    },
    checkRoleAndOwner: (req,res,next) => {
        logger.debug("app => helper => checkRoleAndOwner")

        try{
            // On vérifie le param et le user id si pas admin en cas de routes users
            logger.debug("users routes")
            if (req.baseUrl.includes('/api/users') && req.params.id && req.params.id != req.user.id) {
                return res.status(401).json({error: "Seul le titulaire peut effectuer cette action"});
            }

            logger.debug("comments routes")
            if (req.baseUrl.includes('/api/comments') && req.body.userId && req.body.userId != req.user.id ) {
                return res.status(401).json({error: "Seul le titulaire peut effectuer cette action"})
            }

            // On vérifie pour la route admin
            logger.debug("admin routes")
            if (req.baseUrl.includes('/admin') && req.user.roles && !req.user.roles.includes('ROLES_ALL_ADMIN')) {
                return res.status(401).json({error: "Tu n'as pas les droits suffisant"});
            } else {
                next();
            }

        }catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    }
}
