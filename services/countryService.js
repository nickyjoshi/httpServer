var express   = require( 'express' ),
    _           = require( 'underscore' ),
    Utils       = require( '../globals/util' ),
    Model     = require( '../models/Country' );

var router = express.Router();

router.route( '/' )
  .get( function ( req, res ) {
    Utils.genericAll( req, res, Model);
  } )
  .post(function (req, res) {
    Utils.genericPost( req, res, Model);
  });
  
 router.route( '/byCode/:id' )
  .get( function ( req, res ) {
    Model.findOne( { 'code' : req.params.id }, function ( err, emp ) {
      if ( err ) {
        res.send( err );
      }
      res.json( emp );

    } )
  } );

router.route( '/:id' )
  .get( function ( req, res ) {
    Utils.genericOne( req, res, Model, '_id' );
  } )
  .put(function (req, res) {
    Utils.genericPut( req, res, Model, '_id');
  })
  .post(function (req, res) {
    Utils.genericPost( req, res, Model);
  })
  .delete(function (req, res) {
    Utils.genericDelete( req, res, Model, '_id');
  });

module.exports = router;