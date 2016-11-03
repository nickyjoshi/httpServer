var express   = require( 'express' ),
    _           = require( 'underscore' ),
    Utils       = require( '../globals/util' ),
    Product     = require( '../models/Product' );

var router = express.Router();

router.route( '/' )
  .get( function ( req, res ) {
    Utils.genericAll( req, res, Product);
  } )
  .post(function (req, res) {
    Utils.genericPost( req, res, Product);
  });

router.route( '/:id' )
  .get( function ( req, res ) {
    Utils.genericOne( req, res, Product, 'productID' );
  } )
  .put(function (req, res) {
    Utils.genericPut( req, res, Product, '_id');
  })
  .post(function (req, res) {
    Utils.genericPost( req, res, Product);
  })
  .delete(function (req, res) {
    Utils.genericDelete( req, res, Product, '_id');
  });

module.exports = router;
    