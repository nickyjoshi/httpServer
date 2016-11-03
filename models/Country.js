var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "name"             : {type: String, required: true },
  "code"             : {type: String, required: true },
  "_id"              : {type: String, required: true }
}

var CountrySchema = new Schema( fieldConfig, {
  collection : 'countries'
} );

CountrySchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

CountrySchema.statics.getType = function() {
  return 'Country';
};

module.exports = mongoose.model( 'Country', CountrySchema );
