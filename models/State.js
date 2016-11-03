var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "name"             : String,
  "abbreviation"     : String,
  "_id"              : String,
  "capital"          : String,
  "mostPopulousCity" : String,
  "population"       : Number,
  "squareMiles"      : Number,
  "timeZone1"        : String,
  "timeZone2"        : String,
  "countryCode"      : String,
  "dst"              : String
}


var StateSchema = new Schema( fieldConfig, {
  collection : 'states'
} );

StateSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

StateSchema.statics.getType = function() {
  return 'State';
};

module.exports = mongoose.model( 'State', StateSchema );
