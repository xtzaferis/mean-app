const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'dfr34t4t4t',
            title: 'Post1',
            content: 'Content of Post1'
        },
        {
            id: 'dfrsdfet4t',
            title: 'Post2',
            content: 'Content of Post2'
        },
        {
            id: '3433wt4t4t',
            title: 'Post3',
            content: 'Content of Post3'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched from the server',
        posts
    });
});

module.exports = app;