var should = require('should'),
  config = require('config'),
  koop = require('koop-server/lib');

before(function (done) {
  koop.Cache.db = koop.PostGIS.connect( config.db.postgis.conn );
  Dwd = new require('../models/dwd.js')( koop );
  done();
});

describe('DWD Model', function(){

    describe('when getting data', function(){
      it('should find and return geojson', function(done){
        Dwd.find(1, {}, function(err, data){
          // there should not be any errors
          should.not.exist(err);
          // should always return the data as geojson
          should.exist(data);
          // data should be an array (support multi layer responses)
          data.length.should.equal(1);
          // make sure we have a feature collection
          data[0].type.should.equal('FeatureCollection');
          done();
        });
      });

    });

});

