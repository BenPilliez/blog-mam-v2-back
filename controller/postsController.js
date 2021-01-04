const logger = require("../helpers/logger");
const models = require("../db/models");
const {getPagingData} = require("../helpers/getPagingData");

const DEFAUlT_PHOTOS = ["nature.jpg", "foret.jpg", "prairie.jpg"];

const INCLUDE = [
    {
        model: models.users,
        attributes: {
            exclude: ["password"]
        }
    },
    {
        model: models.category
    },
    {
        model: models.comments,
        where: {
            commentsId: null,
            published: true,
        },
        include: [{
            model: models.users,
            attributes: {
                exclude: ["password"]
            }
        }, {
            model: models.comments,
            as: "Children",
            where: {
                published: true
            },
            required: false,
            include: {
                model: models.users,
                attributes: {
                    exclude: ["password"]
                }
            }
        }],
        required: false
    }
];


module.exports = {
    get_posts: async (req, res) => {
        logger.debug("app => postsController => get_posts");

        try {

            const limit = parseInt(req.query.perPage) || 10;
            const page = parseInt(req.query.page) || 0;
            const offset = limit * page;

            query = {
                where: {},
                include: INCLUDE,
                limit: limit,
                offset: offset,
                distinct: true,
                order: [req.query.order || ["title", "ASC"]]
            };


            if (req.baseUrl.includes("/api")) {
                query.where = {published: true};
            }

            const posts = await models.posts.findAndCountAll(query);

            if (posts.count === 0) {
                return res.sendStatus(404);
            }

            const postsData = getPagingData(posts, page, limit);

            return res.json(postsData);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    },
    get_details_posts: async (req, res) => {
        logger.debug("app => postsController => get_details_posts");

        try {

            console.log(INCLUDE);

            const post = await models.posts.findOne({
                where: {
                    slug: req.params.slug
                },
                include: INCLUDE
            });

            if (!post) {
                return res.status(404).json({error: "Aucun post"});
            }

            return res.json(post);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    },
    create_post: async (req, res) => {
        logger.debug("app => postsController => create_post");
        try {
            const body = req.body;

            if (req.body.photos.length === 0) {
                body["photos"] = DEFAUlT_PHOTOS;
            }

            body["usersId"] = req.user.id;

            const post = await models.posts.create(body);

            return res.json(post);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    },
    update_post: async (req, res) => {
        logger.debug("app => postsController => update_post");

        try {

            const post = await models.posts.findByPk(req.params.id, {
                include: INCLUDE
            });

            if (!post) {
                return res.status(404).json("Aucun post");
            }

            const body = req.body;
            body["photos"] = post.photos;

            if (req.body.photos && req.body.photos.length > 0) {

                req.body.photos.map((file) => {
                    body["photos"] = [...body["photos"], file];
                });
            }

            await post.update(req.body);
            return res.json(post);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    },
    delete_post: async (req, res) => {
        logger.debug("app => postsController => delete_post");
        try {
            const post = await models.posts.findByPk(req.params.id);

            if (!post) {
                return res.sendStatus(404);
            }
            await post.destroy();
            return res.sendStatus(200);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    },
    set_published: async (req, res) => {
        logger.debug("app => postsController => update_published_value ");

        try {

            let post = await models.posts.findByPk(req.params.id);

            if (!post) {
                return res.sendStatus(404);
            }

            await post.update({
                published: req.body.published
            });

            return res.json(post);

        } catch (e) {
            logger.error(e);
            return res.status(500).json({error: e});
        }
    }
};
