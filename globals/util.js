
var util = {
    safeSet: function ( model, obj, sFields ) {
        sFields.forEach( function ( field ) {
            if ( obj[field] ) {
            model[field] = obj[field];
            }
        } );
    },
    genericPut: function ( req, res, model, primaryKeyField) {   
        var entity = this;
        var searchConfig = {};
        searchConfig[primaryKeyField] = req.params.id;
        model.findOne( searchConfig,
            function ( err, instance ) {
            if ( err ) {
                res.send( err );
                res.end();
            } else {
                entity.safeSet( instance, req.body, model.getFields() );
                instance.save( function ( err ) {
                if ( err ) {
                    res.send( err );
                }
                res.json( instance );
                } )
            }
            } 
          )
    },
    genericPost : function( req, res, model ) {
        var instance = new model();
        this.safeSet( instance, req.body, model.getFields() );

        instance.save( function ( err, obj, numberAffected ) {
            if ( err ) {
            res.json( err );
            res.end();
            } else if ( numberAffected ) {
            res.json( {
                message        : model.getType() + ' updated!',
                numberAffected : numberAffected
            } );
            } else {

            res.json( { message : model.getType() + ' created!' } );
            }
        } )
    },
    genericDelete: function (req, res, model, primaryKeyField) {
        var searchConfig = {};
        searchConfig[primaryKeyField] = req.params.id;
        model.remove(searchConfig, function(err) {
            if ( err ) {
                res.send( err );
            }
            res.json( { message : model.getType() + ' #' + req.params.id + ' removed' } )
        });    
    },
    genericAll:function name(req, res, model) {
        model.find( function ( err, emps ) {
            if ( err ) {
                res.send( err );
            }
            res.json( emps );
            } );
    },
    genericOne: function (req, res, model, primaryKeyField) {
        var searchConfig = {};
        searchConfig[primaryKeyField] = req.params.id;
        model.findOne( searchConfig, function ( err, result ) {
            if ( err ) {
                res.send( err );
            }
                res.json( result );
            } 
        )
     }
};

module.exports = util;