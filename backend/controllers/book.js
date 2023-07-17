const Book = require('../models/Book');

exports.createBooks = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id;
    delete bookObject._userId;
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
    Book.findOne({_id: req.params.id})
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}

exports.getBooksRating = (req, res, next) => {
    const sortByMapped = (map,compareFn) => (a,b) => compareFn(map(a),map(b));
    const byValue = (a,b) => a - b;
    const toRating = e => e.averageRating;
    const byRating = sortByMapped(toRating,byValue);
    Book.find()
    .then((books) => {
        if (books === null) {
            res.status(400)
        } else {
            let resu = []
            let sortBooks = books.sort(byRating);
            sortBooks = sortBooks.reverse();
            resu.push(sortBooks[0]);
            if (books.length >= 2) {
                resu.push(sortBooks[1]);
                if (books.length >= 3)
                    resu.push(sortBooks[2]);
            }
            res.status(200).json(resu);
        }
    })
    .catch(error => res.status(400).json({ error }));
}

exports.modifBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.setRate = (req, res, next) => {
    new_rate = req.body;
    new_rate.grade = new_rate.rating;
    Book.findOne({_id: req.params.id})
    .then((book) => {
        let average = new_rate.grade;
        let rate = book.ratings;
        let i = 0;
        for (i; i < rate.length; i++) {
            average = average + rate[i].grade;
        }
        average = average / (i + 1);
        rate.push(new_rate);
        Book.updateOne({ _id: req.params.id }, { $set: { averageRating: average, ratings: rate }})
        .then(() => res.status(200).json(book))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};
