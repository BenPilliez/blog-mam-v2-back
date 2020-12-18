const logger = require("../helpers/logger");
const jwt = require("jsonwebtoken");
const models = require("../db/models");
const {isEmpty, checkProperty} = require("../helpers/checkBody");


module.exports = {
    signup: async (req, res) => {
        logger.debug("app => authController => signup");
        try {
            let body = req.body;

            if (isEmpty(body) && checkProperty(body, "email, password, username")) {
                return res.status(400).json({error: "Les champs ne peuvent être vide"});
            }
            body["avatar"] = "user.jpg";
            const user = await models.users.create(req.body);

            let token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    roles: user.ROLES
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                    audience: process.env.AUDIENCE,
                    issuer: process.env.ISSUER
                }
            );

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
    },
    signin: async (req, res) => {
        logger.debug("app => authController => signin");

        try {

            if (isEmpty(req.body) && checkProperty(email)) {
                return res.status(400).json({error: "Les champs ne peuvent être vide"});
            }

            let user = await models.users.findOne({
                where: {
                    email: req.body.email
                },
                attributes: ["id", "email", "password", "avatar", "ROLES"]
            });

            if (!user) {
                logger.debug("User incorrect");
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            if (req.baseUrl.includes("/admin") && !user.ROLES.includes("ROLES_ALL_ADMIN")) {
                return res.status(401).json("Tu n'as pas les droits nécessaire ");
            }

            let password = user.validatePassword(req.body.password, user.password);

            if (!password) {
                logger.debug("Password incorrect");
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
                    expiresIn: "24h",
                    audience: process.env.AUDIENCE,
                    issuer: process.env.ISSUER
                }
            );

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
};
