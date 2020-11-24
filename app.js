require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const indexRouter = require('./routes/index')
const logger = require('./helpers/logger')

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

// 404 Not found
app.use(function (req, res, next) {
    res.status(404).send({error: 'Oops aucune page'})
    next()
});

if (typeof (PhusionPassenger) !== 'undefined') {
    app.listen('passenger')
}else {
    logger.debug('Serveur lancé sur le port ' + process.env.PORT)
    app.listen(process.env.PORT)
}
