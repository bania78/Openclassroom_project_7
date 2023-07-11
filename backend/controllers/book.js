const Book = require('../models/Book');

exports.createBooks = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    Book.findOne({id: req.params._id})
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}

exports.getBooksRating = (req, res, next) => {
    Book.find()
    .then((books) => {
        /*books.sort();
        let rate = [];
        rate.append(books[0]);
        rate.append(books[1]);
        rate.append(books[2]);*/
        if (books === null) {
            res.status(400)
        } else {
            res.status(200).json({messag: 'books' })
        }
    })
    .catch(error => res.status(400).json({ error }));
}
