var request = require('request'),
  BaseModel = require('koop-server/lib/BaseModel.js');

var dwd = function( koop ){

  var wfs = {};
  wfs.__proto__ = BaseModel( koop );

  wfs.find = function( id, options, callback ){

    var type = 'dwd';

    // check the cache for data with this type & id
    koop.Cache.get( type, id, options, function(err, entry ){
      if ( err){
        // if we get an err then get the data and insert it
        // URL of dwd's WFS geoserver endpoint, which serves geoJSONs
        var url = 'http://maps.dwd.de/geoserver/dwd/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='+id+'&outputFormat=application/json';

        request.get(url, function(e, res){
          var geojson = JSON.parse(res.body);

          // insert data into the cache; assume layer is 0 unless there are many layers (most cases 0 is fine)
          koop.Cache.insert( type, id, geojson, 0, function( err, success){
            if ( success ) {
              callback( null, geojson );
            }
          });
        });
      } else {
        callback( null, entry );
      }
    });
  };

  return dwd;

};

module.exports = dwd;
