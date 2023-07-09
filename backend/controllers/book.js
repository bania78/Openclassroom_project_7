const Book = require('../models/Book');

exports.createBooks = (req, res, next) => {
    delete req.body._id;
    const book = new Book({
    ...req.body
    });
    book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

exports.getBooksbyId = (req, res, next) => {
    Book.findOne({id: req.params.id})
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}
