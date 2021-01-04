const sharp = require("sharp");
const {v4: uuid} = require("uuid");
const logger = require("../helpers/logger");

const resizeImages = async (req, res, next) => {
    logger.debug("RESIZE IMAGE");
    try {
        if (!req.files) return next();
        req.body.photos = [];
        await Promise.all(
            req.files.photos.map(async file => {
                const id = await uuid();
                const newFilename = `${id}.webp`;

                await sharp(file.buffer)
                    .resize(620, 600)
                    .toFormat("webp")
                    .webp({quality: 90})
                    .toFile(`./public/images/${newFilename}`);

                req.body.photos.push(newFilename);
            })
        );

        next();
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    resizeImages: resizeImages,
};
