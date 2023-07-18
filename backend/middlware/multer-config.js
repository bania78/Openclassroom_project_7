const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.memoryStorage();

const upload = multer({ storage }).single('image');

module.exports = (req, res, next) => {
    upload(req, res, async (err) => {
        if (req.file === undefined) {
            next();
        } else {
            fs.access("./images", (error) => {
                if (error) {
                    fs.mkdirSync("./images");
                }
            });
            const { buffer, originalname } = req.file;
            const name = originalname.split(' ').join('_');
            const filenameArray = name.split('.')
            filenameArray.pop()
            const filenameWithoutExtention = filenameArray.join('.')
            const ref = `${filenameWithoutExtention}${Date.now()}.webp`;
            req.file.filename = ref;
            await sharp(buffer)
                .webp({ quality: 20 })
                .toFile("./images/" + ref);
            next();
        }
})}