var should = require('should'),
  sinon = require('sinon'),
  config = require('config'),
  request = require('supertest'),
  // we require Koop so we can fake having an actual server running
  koop = require('koop-server')(config);

  // we need koop/lib so we can have access to shared code not exposed directly off the koop object
  kooplib = require('koop-server/lib');

var dwd;

before(function(done){
  // pull in the provider module
  var provider = require('../index.js');

  // create the model
  dwd = new provider.model( kooplib );

  // pass the model to the controller
  var controller = new provider.controller( dwd );

  // bind the default routes so we can test that those work
  koop._bindDefaultRoutes( provider.name, provider.pattern, controller );

  // bind the routes into Koop
  koop._bindRoutes( provider.routes, controller );
  done();
});

after(function(done){
  done();
});

describe('DWD Controller', function(){

    describe('get', function() {
      before(function(done ){

        // we stub the find method so we dont actually try to call it
        // we're not testing the model here, just that the controller should call the model
        sinon.stub(dwd, 'find', function(id, options, callback){
          callback(null, [{
            type:'FeatureCollection',
            features: [{ properties: {}, coordinates: {}, type: 'Feature' }]
          }]);
        });

        done();
      });

      after(function(done){
        // restore the stubbed methods so we can use them later if we need to
        dwd.find.restore();
        done();
      });

      it('/dwd/1 should call find', function(done){
        request(koop)
          .get('/dwd/1')
          .end(function(err, res){
            res.status.should.equal(200);
            //dwd.find.called.should.equal(true);
            done();
        });
      });
    });

    describe('index', function() {
      it('/dwd should return 200', function(done){
        request(koop)
          .get('/dwd')
          .end(function(err, res){
            res.status.should.equal(200);
            done();
        });
      });
    });

    describe('preview', function() {
      it('/dwd/1/preview should return 200', function(done){
        request(koop)
          .get('/dwd/1/preview')
          .end(function(err, res){
            res.status.should.equal(200);
            done();
        });
      });
    });

    describe('FeatureServer', function() {
      it('/dwd/1/FeatureServer should return 200', function(done){
        request(koop)
          .get('/dwd/1/FeatureServer')
          .end(function(err, res){
            res.status.should.equal(200);
            done();
        });
      });
    });

});
