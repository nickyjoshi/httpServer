var express   = require( 'express' ),
    _           = require( 'underscore' ),
    Utils       = require( '../globals/util' ),
    Model     = require( '../models/Category' );

var router = express.Router();

router.route( '/' )
  .get( function ( req, res ) {
    Utils.genericAll( req, res, Model);
  } )
  .post(function (req, res) {
    Utils.genericPost( req, res, Model);
  });

router.route( '/:id' )
  .get( function ( req, res ) {
    Utils.genericOne( req, res, Model, 'categoryID' );
  } )
  .put(function (req, res) {
    Utils.genericPut( req, res, Model, 'categoryID');
  })
  .post(function (req, res) {
    Utils.genericPost( req, res, Model);
  })
  .delete(function (req, res) {
    Utils.genericDelete( req, res, Model, 'categoryID');
  });

module.exports = router;