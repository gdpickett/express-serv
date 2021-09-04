const express = require('express');
const promotionRouter = express.Router();
const Promotion = require('../models/promotion');

promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.put( (req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err))
    res.end(`Will send all promotion: ${req.body.name} with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported promotions');
})
.delete((req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

promotionRouter.route('/:campsitesId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion=> {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err=> next(err));
})
.put( (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    },{ new: true})
    .then(promotion => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err=> next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('Post not supported promotions');
})
.delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err=> next(err));
});

module.exports = promotionRouter;