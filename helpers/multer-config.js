const multer = require('multer')
const {v4: uuid} = require('uuid')
const logger = require('../helpers/logger')

logger.debug('app => helpers => multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images')
    },

    filename: async (req, file, callback) => {
        const id = await uuid();
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${id}.${extension}`)
    }
})

module.exports = multer({storage}).fields([{ name: 'avatar', maxCount: 1 }, { name: 'photos', maxCount: 3 }]);
