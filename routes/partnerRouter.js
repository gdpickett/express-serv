const express = require('express');
const partnersRouter = express.Router();

partnersRouter.route('/')
//app.all('/partners', (req, res, next) => {
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res) => {
    res.end('Will send all partners');
})
.put( (req, res) => {
    res.end(`Will send all partners: ${req.body.name} with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported partners');
})
.delete((req, res) => {
    res.statusCode = 200;
    res.end('Deleting partners');
});

partnersRouter.route('/:campsitesId')
//app.all('/campsites', (req, res, next) => {
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res) => {
    res.end('Will send all partners');
})
.put( (req, res) => {
    res.end(`Will send all partner: ${req.body.name} with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported partners');
})
.delete((req, res) => {
    res.statusCode = 200;
    res.end('Deleting partners');
});

module.exports = partnersRouter;