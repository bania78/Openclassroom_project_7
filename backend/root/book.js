const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth')
const bookCtrl = require('../controllers/book');
const multer = require('../middlware/multer-config')

router.get('/', bookCtrl.getBooks);

router.put('/:id', auth, multer, bookCtrl.modifBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/bestrating', bookCtrl.getBooksRating);
router.post('/', auth, multer, bookCtrl.createBooks);
router.post('/:id/rating', auth, bookCtrl.setRate);
router.get('/:id', bookCtrl.getBooksbyId);

module.exports = router;