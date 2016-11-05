var express   = require( 'express' ),
    _           = require( 'underscore' ),
    Utils       = require( '../globals/util' ),
    Exercise     = require( '../models/Exercise' ),
    jwt = require('express-jwt');

var router = express.Router();
var auth = jwt({secret: 'SECRET', userProperty:'payload'});

router.route( '/' )
  .get( auth, function ( req, res ) {
    Utils.genericAll( req, res, Exercise);
  } );
  /*.post(function (req, res) {
    Utils.genericPost( req, res, State);
  });

router.route( '/byAbbreviation/:abbrev' )
  .get( function ( req, res ) {
    State.findOne( { 'abbreviation' : req.params.abbrev }, function ( err, emp ) {
      if ( err ) {
        res.send( err );
      }
      res.json( emp );

    } )
  } );
  
router.route( '/:id' )
  .get( function ( req, res ) {
    Utils.genericOne( req, res, State, '_id' );
  } )
  .put(function (req, res) {
    Utils.genericPut( req, res, State, '_id');
  })
  .post(function (req, res) {
    Utils.genericPost( req, res, State);
  })
  .delete(function (req, res) {
    Utils.genericDelete( req, res, State, '_id');
  });
  */

module.exports = router;
    