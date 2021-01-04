const multer = require("multer");
const logger = require("../helpers/logger");

logger.debug("app => helpers => multer");

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images");
    },
});

module.exports = multer({storage}).fields([{name: "avatar", maxCount: 1}, {name: "photos", maxCount: 3}]);
