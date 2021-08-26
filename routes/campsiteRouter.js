const express = require('express');
const { response } = require('../app');
const campsiteRouter = express.Router();
const Campsite = require('../models/campsite');

campsiteRouter.route('/')
//app.all('/campsites', (req, res, next) => {
/*.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res) => {*/
.get((req, res, next) => {
    Campsite.find()
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsites);
    })
    //res.end('Will send all campsites');
    .catch(err => next(err));
})
.post( (req, res, next) => {
    Campsite.create(req.body)
    .then(campsite => {
        console.log('Campsite created ', campsite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err))
    res.end(`Will send all campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('Put not supported campsites');
})
.delete((req, res, next) => {
    //res.statusCode = 200;
    //res.end('Deleting campsites');
    Campsite.deleteMany()
    .then(response => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

campsiteRouter.route('/:campsitesId')
//app.all('/campsites', (req, res, next) => {
/*.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    next();
})*/
.get((req, res, next) => {
    //res.end('Will send all campsites');
    Campsite.findById(req.params.campsitesId)
    .then(campsite=> {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err=> next(err));
})
.put( (req, res, next) => {
    //res.end(`Will send all campsite: ${req.body.name} with description: ${req.body.description}`);
    Campsite.findByIdAndUpdate(req.params.campsitesId, {
        $set: req.body
    },{ new: true})
    .then(campsite => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err=> next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported campsites');
})
.delete((req, res, next) => {
    //res.statusCode = 200;
    //res.end('Deleting campsites');
    Campsite.findByIdAndDelete(req.params.campsitesId)
    .then(response => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err=> next(err));
});


module.exports = campsiteRouter;