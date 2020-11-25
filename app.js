require('dotenv').config()
//Middleware
const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('./helpers/logger')
const multer = require('./helpers/multer-config')
const {verifToken} = require('./helpers/authHelper')

//Router
const indexRouter = require('./routes/index')
const postApiRouter = require('./routes/api/postsRouter')
const postAdminRouter = require('./routes/admin/postsRouter')
const categoryApiRouter = require('./routes/api/categoryRouter')
const categoryAdminRouter = require('./routes/admin/categoryRouter')
const authAdminRouter = require('./routes/admin/authRouter')
const rateRouter = require('./routes/api/rateRouter')
const commentsRouter = require('./routes/api/commentsRouter')
const authApiRouter = require('./routes/api/authController')


// Pour o2switch panel
if (typeof (PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({autoInstall: false});
}

// Initilisation du server express
const app = express()

// Middleware
app.use(express.urlencoded({extended: true}))
app.use('/api/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())

//Routes
app.use('', indexRouter)

//Routes api
app.use('/api/posts', postApiRouter)
app.use('/api/category', categoryApiRouter)
app.use('/api/rate', rateRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/', authApiRouter)

//Routes admin
app.use('/admin/', authAdminRouter)
app.use('/admin/posts', verifToken, multer, postAdminRouter)
app.use('/admin/category', verifToken, categoryAdminRouter)

// 404 Not found
app.use(function (req, res, next) {
    res.status(404).send({error: 'Oops aucune page'})
    next()
});

if (typeof (PhusionPassenger) !== 'undefined') {
    app.listen('passenger')
} else {
    logger.debug('Serveur lancé sur le port ' + process.env.PORT)
    app.listen(process.env.PORT)
}
