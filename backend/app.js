const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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