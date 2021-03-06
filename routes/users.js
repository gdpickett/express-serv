const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');

const router = express.Router();

/* GET users listing. */
router.route('/')
.options(cors.corsWithOptions, (req,res) => res. sendStatus(200))
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
	//authenticate.verifyAdmin(req, res, next);
	if(req && req.user.admin === true){
		User.find()
		.then(users => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(users);
			return next();
		})
		//res.end('Will send all campsites');
		.catch(err => next(err));
	}else{
		res.statusCode = 200,
		res.setHeader('Content-Type', 'application/json');
		res.send('No user? '+req.user);
	}
	/*if(err){
		return next(err);
	}else{
		return next();
	}*/
	
});

router.post('/signup', cors.corsWithOptions, (req, res) => {
	User.register(
		new User({username: req.body.username}),
		req.body.password,
		(err, user) => {
			if(err){
				res.statusCode = 500,
				res.setHeader('Content-Type', 'application/json');
				res.json({err: err});
			}else{
				if(req.body.firstname){
					user.firstname = req.body.firstname;
				}
				if(req.body.lastname){
					user.lastname = req.body.lastname;
				}
				user.save(err => {
					if(err) {
						res.statusCode = 500;
						setHeader('Content-Type', 'application/json');
						res.json({err: err});
						return;
					}
					passport.authenticate('local')(req, res, () => {
						res.statusCode = 200,
						res.setHeader('Content-Type', 'application/json');
						res.json({success: true, status: 'Registration Successful!'});
					});
				});				
			}
		}
	)
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
	const token = authenticate.getToken({ _id: req.user._id})
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout', cors.corsWithOptions, (req, res, next) => {
	if (req.session){
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	}else{
		const err = new Error('Please log in');
		err.status = 401;
		return next(err);
	}
})

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
	if(req.user){
		const token = authenticate.getToken({_id: req.user._id});
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({success: true, token: token, status: 'Facebook login successful!'});
		//return done(err, false);
	}
	if(!err && user) {
		return done(null, user);
	}
});

module.exports = router;
