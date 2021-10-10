const path = require('path');
const express = require('express');
const Quote = require('./models/quote');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.post('/quotes', (req, res) => {
    const quote = new Quote(req.body);

    quote
        .save()
        .then(() => {
            res.status(201).send(quote);
        })
        .catch((e) => {
            console.log(e);
            res.status(400).send(e);
        });
});

app.get('/quotes', (req, res) => {
    Quote.countDocuments((error, count) => {
        if (error) {
            return res.status(500).send(error);
        }

        const rand = Math.floor(Math.random() * count);

        Quote.findOne()
            .skip(rand)
            .then((quote) => {
                res.send(quote);
            })
            .catch((e) => {
                res.status(500).send(e);
            });
    });
});

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
    console.log('server is up on port ' + port);
});
