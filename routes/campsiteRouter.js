const express = require('express');
const campsiteRouter = express.Router();

campsiteRouter.route('/')
//app.all('/campsites', (req, res, next) => {
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res) => {
    res.end('Will send all campsites');
})
.put( (req, res) => {
    res.end(`Will send all campsite: ${req.body.name} with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported campsites');
})
.delete((req, res) => {
    res.statusCode = 200;
    res.end('Deleting campsites');
});

campsiteRouter.route('/:campsitesId')
//app.all('/campsites', (req, res, next) => {
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res) => {
    res.end('Will send all campsites');
})
.put( (req, res) => {
    res.end(`Will send all campsite: ${req.body.name} with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported campsites');
})
.delete((req, res) => {
    res.statusCode = 200;
    res.end('Deleting campsites');
});


module.exports = campsiteRouter;