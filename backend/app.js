const express = require('express');
const mongoose = require('mongoose');
const data = require('../public/data/data.json');
const { findOne } = require('./models/Book');
const bookRoutes = require('./root/book')
const userRoutes = require('./root/user')
const path = require('path');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://louisbw78:test@cluster0.eh1ti53.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    /*for (let i = 0; i<data.length; i++) {
        if (dataBook.title == null) {
            const book = new Book({
                ...data[i]
            });
            book.save()
        }
    }*/
    next();
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;