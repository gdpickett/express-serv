const express = require('express');
const Campsite = require('../models/campsite');
const authenticate = require('../authenticate');

const campsiteRouter = express.Router();

campsiteRouter.route('/')
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
.post( authenticate.verifyUser, (req, res, next) => {
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
.put( authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('Put not supported campsites');
})
.delete( authenticate.verifyUser, (req, res, next) => {
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
.put( authenticate.verifyUser,  (req, res, next) => {
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
.post( authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('Post not supported campsites');
})
.delete( authenticate.verifyUser, (req, res, next) => {
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

campsiteRouter.route('/:campsitesId/comments')
.get((req, res, next) => {
    Campsite.findById(req.params.campsitesId)
    .then(campsite => {
        if(campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments);
        }else{
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    //res.end('Will send all campsites');
    .catch(err => next(err));
})
.post( authenticate.verifyUser,  (req, res, next) => {
    Campsite.findById(req.params.campsitesId)
    .then(campsite => {
        if(campsite) {
            campsite.comments.push(req.body);
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err =>next(err));            
        }else{
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
    //res.end(`Will send all campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put( authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`Put not supported /campsites/${req.params.campsitesId}/comments} `);
})
.delete( authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsitesId)
    .then(campsite => {
        if(campsite) {
            for(let i = (campsite.comments.length-1); i>=0; i--) {
                campsite.comments.id(campsites[i]._id).remove();
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err =>next(err));            
        }else{
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

campsiteRouter.route('/:campsitesId/comments/:commentId')
.get((req, res, next) => {
    Campsite.findById(req.params.campsitesId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments.id(req.params.commentId));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }else{
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    //res.end('Will send all campsites');
    .catch(err => next(err));
})
.post( authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`Post not supported /campsites/${req.params.campsitesId}/comments/${req.params.commentId} `);
})
.put( authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsitesId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) {
            if(req.body.rating){
                campsite.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if(req.body.text){
                campsite.comments.id(req.params.commentId).text = req.body.text;
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }else{
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    //res.end('Will send all campsites');
    .catch(err => next(err));
})
.delete( authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsitesId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) {
            campsite.comments.id(req.params.commentId).remove();            
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }else{
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

module.exports = campsiteRouter;