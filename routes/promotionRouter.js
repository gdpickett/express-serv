const express = require('express');
const promotionsRouter = express.Router();

promotionsRouter.route('/')
//app.all('/promotions', (req, res, next) => {
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res) => {
    res.end('Will send all promotions');
})
.put( (req, res) => {
    res.end(`Will send all promotions: ${req.body.name} with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported promotions');
})
.delete((req, res) => {
    res.statusCode = 200;
    res.end('Deleting promotions');
});

promotionsRouter.route('/:campsitesId')
//app.all('/campsites', (req, res, next) => {
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res) => {
    res.end('Will send all promotions');
})
.put( (req, res) => {
    res.end(`Will send all promotion: ${req.body.name} with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported promotions');
})
.delete((req, res) => {
    res.statusCode = 200;
    res.end('Deleting promotions');
});

module.exports = promotionsRouter;