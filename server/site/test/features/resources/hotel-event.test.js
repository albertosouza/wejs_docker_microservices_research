var assert = require('assert');
var request = require('supertest');
var helpers = require('we-test-tools').helpers;
var stubs = require('we-test-tools').stubs;
var _ = require('lodash');
var http;
var we;

describe('hotel-eventFeature', function () {
  var salvedPage, salvedUser, salvedUserPassword;
  var authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
    we = helpers.getWe();

    var userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) throw err;

        done();
      });

    });
  });

  describe('find', function () {
    it('get /hotel-event route should find one hotel-event', function(done){
      request(http)
      .get('/hotel-event')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body.hotel-event);
        assert( _.isArray(res.body.hotel-event) , 'hotel-event not is array');
        assert(res.body.meta);

        done();
      });
    });
  });
  describe('create', function () {
    it('post /hotel-event create one hotel-event record');
  });
  describe('findOne', function () {
    it('get /hotel-event/:id should return one hotel-event');
  });
  describe('update', function () {
    it('put /hotel-event/:id should upate and return hotel-event');
  });
  describe('destroy', function () {
    it('delete /hotel-event/:id should delete one hotel-event')
  });
});
