var config = require('./config/config'),
  express = require( 'express' ),
  bodyParser = require( 'body-parser' ),
  morgan = require( 'morgan' ),
  stateService = require( './services/stateService' ),
  productService = require( './services/productService' ),
  categoryService = require( './services/categoryService' ),
  customerService = require( './services/customerService' ),
  countryService = require( './services/countryService' ),
  exerciseService = require( './services/exerciseService' ),
  userService = require('./services/userService'),
  mongoose = require( 'mongoose' ),
  passport = require('passport'),
  passportConfig = require('./config/passport');


console.log( config );
mongoose.connect( config.classDB.url ,
  {
    user : config.classDB.user,
    pass : config.classDB.pass
  } );

var app = express();
app.use( morgan( 'dev' ) );
app.use(passport.initialize());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended : true} ) );

app.set( 'json spaces', 4 );

var port = process.env.PORT || 9081; 		// set our port

var router = express.Router();

// middleware to use for all requests
app.use( function ( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", config.localhost.url );
  res.header( "Access-Control-Allow-Methods", "POST,PUT,DELETE" );
  res.header( "Access-Control-Allow-Headers", "X-Requested-With, Content-Type" );
  res.header( 'Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range, X-Content-Range' );
  res.header( "Content-Type", "application/json" );
  next();
} );

// test route to make sure everything is working
// (accessed at GET http://localhost:8001/api)
router.get( '/', function ( req, res ) {
  res.json( {message : 'RESTful interface is operational.'} );
} );

// more routes for our API will happen here

// REGISTER OUR Services -------------------------------
app.use( '/states', stateService );
app.use( '/products', productService );
app.use( '/categories', categoryService );
app.use( '/customers', customerService );
app.use( '/countries', countryService );
app.use( '/exercises', exerciseService );
app.use( '/user', userService );

// START THE SERVER
// =============================================================================
app.listen( port );
console.log( 'Server has started up and is bound to port ' + port );
