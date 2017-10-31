var assert = require('assert');
var request = require('supertest');
var helpers = require('we-test-tools').helpers;
var stubs = require('we-test-tools').stubs;
var _ = require('lodash');
var http;
var we;

describe('roomFeature', function () {
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
    it('get /room route should find one room', function(done){
      request(http)
      .get('/room')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body.room);
        assert( _.isArray(res.body.room) , 'room not is array');
        assert(res.body.meta);

        done();
      });
    });
  });
  describe('create', function () {
    it('post /room create one room record');
  });
  describe('findOne', function () {
    it('get /room/:id should return one room');
  });
  describe('update', function () {
    it('put /room/:id should upate and return room');
  });
  describe('destroy', function () {
    it('delete /room/:id should delete one room')
  });
});
