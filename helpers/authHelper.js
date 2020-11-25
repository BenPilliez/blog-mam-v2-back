const jwt = require('jsonwebtoken')

module.exports = {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    verifToken: (req, res, next) => {
        console.debug('app => helper => verifToken');
        try {

            let token = req.headers.authorization
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length)
            } else {
                return res.status(400).json({error: 'Jwt mal formé'})
            }

            req.user = jwt.decode(token, process.env.JWT_SECRET);

            //On vérifie dans le body en cas de posts ou autre
            if (req.baseUrl.includes('/admin') && req.baseUrl !== "/admin/signin" && req.user.roles && !req.user.roles.includes('ROLES_ALL_ADMIN')) {
                return res.status(401).json({error: "Tu n'as pas les droits suffisant"});
            } else {
                next();
            }

        } catch (err) {
            console.error(err);
            res.status(401).json({error: 'Tu dois authentifié pour accéder à cette ressource'})

        }
    }

}
