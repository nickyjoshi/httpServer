var express   = require( 'express' ),
    _           = require( 'underscore' ),
    Utils       = require( '../globals/util' ),
    User     = require( '../models/User' ),
    passport = require('passport');


var router = express.Router();

router.route( '/' )
  .get( function ( req, res ) {
    Utils.genericAll( req, res, User);
  } );

//Register method
  router.post('/register', function(req, res, next){

console.log("username sent: " + req.body.username);
console.log("body:" + JSON.stringify(req.body.username));

  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password);

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

//Login method
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

  module.exports = router;