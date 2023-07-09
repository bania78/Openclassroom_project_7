const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: "user create" }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.logIn = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user === null) {
                res.status(401).json({message: 'Identifiant ou mot de passe incorrecte'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({message: 'Identifiant ou mot de passe incorrecte'})
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                toker: 'test'
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};