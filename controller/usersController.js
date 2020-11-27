const models = require('../db/models')
const logger = require('../helpers/logger')
const {getPagingData} = require("../helpers/getPagingData");


module.exports = {

    get_users: async (req, res) => {
        logger.debug("app => usersController => get_users")
        try {
            const limit = parseInt(req.query.perPage) || 10
            const page = parseInt(req.query.page) || 0
            const offset = limit * page

            const users = await models.users.findAndCountAll({
                limit: limit, offset: offset
            })

            if (users.count === 0) {
                return res.status(404).json("Aucun posts")
            }

            const usersData = getPagingData(users, page, limit)

            return res.json(usersData)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e}
            )
        }

    },

    get_details: async (req, res) => {
        logger.debug("app => usersController => get_details")
        try {

            const user = await models.users.findByPk(req.params.id)

            if (!user) {
                return res.sendStatus(404)
            }

            return res.json(user)

        } catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
    },
    update_user: async (req,res) => {
      logger.debug("app => usersController => update_user")

      try{
          let user = await models.users.findByPk(req.params.id)

          if(!user){
              return res.sendStatus(404)
          }

          await user.update(req.body)

          return res.json({
              id: user.id,
              email: user.email,
          })

      }catch (e){
          logger.error(e)
          return res.status(500).json({error: e})
      }
    },
    update_user_password: async (req,res) => {
        logger.debug("app => usersController => update_user_password")
        try {

            let user = await models.users.findByPk(req.params.id)

            if (!user) {
                return res.status(404).json({error: 'Aucun utilisateur'})
            }

            let valid = await user.validatePassword(req.body.oldPassword)

            if (!valid) {
                console.error('Ancien mot de passe correspond pas')
                return res.status(404).json({
                    error: 'L\'ancien mot de passe ne correspond pas'
                })
            }

            await user.update({
                password: req.body.password
            })

            return res.sendStatus(200)

        } catch (e) {
            console.error(e)
            return res.status(500).json({error: e})
        }
    },
     delete_user : async(req,res) => {
        logger.debug("app => usersController => delete_user")

        try{
            const user = await models.users.findByPk(req.params.id)
            if(!user){
                return res.sendStatus(404)
            }

            await users.destroy()

            return res.sendStatus(200)

        }catch (e) {
            logger.error(e)
            return res.status(500).json({error: e})
        }
     }

}
