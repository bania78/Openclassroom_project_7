const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const filenameArray = name.split('.')
		filenameArray.pop()
		const filenameWithoutExtention = filenameArray.join('.')
        const extension = MIME_TYPES[file.mimetype];
        callback(null, filenameWithoutExtention + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('image');