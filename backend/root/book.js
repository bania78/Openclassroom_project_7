const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');

router.get('/', bookCtrl.getBooks);

router.get('/:id', bookCtrl.getBooksbyId);

router.post('/', bookCtrl.createBooks);

module.exports = router;