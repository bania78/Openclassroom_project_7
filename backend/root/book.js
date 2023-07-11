const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth')
const bookCtrl = require('../controllers/book');
const multer = require('../middlware/multer-config')

router.get('/', bookCtrl.getBooks);
router.get('/:id', bookCtrl.getBooksbyId);
router.get('/bestrating', bookCtrl.getBooksRating);
router.post('/', auth, multer, bookCtrl.createBooks);

module.exports = router;