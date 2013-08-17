
/**
 * Module Dependencies
 */

var app = require('express')(),
    request = require('supertest'),
    es = require('./');

/**
 * Configure
 */

before(function() {
  app.set('view engine', 'hbs');
  app.set('views', './views');
  app.use(app.router);
  app.use(es.notFound());
  app.use(es.error());

  app.get('/404', function(req, res, next) {
    next();
  });

  app.get('/500', function(req, res, next) {
    next(new Error('Ninjas have stolen the servers'));
  });
});



/**
 * Tests
 */

describe('404 Not Found', function() {

  it('should respond with HTML', function(done) {
    return request(app).get('/404')
      .expect(404)
      .expect('Content-Type', /text\/html/)
      .expect(/404/)
      .expect(/Not Found/, done);
  });

  it('should respond with JSON', function(done) {
    return request(app).get('/404')
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', 'application/json', done);
  });

  it('should respond with text', function(done) {
    return request(app).get('/404')
      .set('Accept', 'text')
      .expect(404)
      .expect('Content-Type', 'text/plain')
      .expect('404: Not Found', done);
  });

});

describe('500 Internal Server Error', function() {

  it('should respond with HTML', function(done) {
    return request(app).get('/500')
      .expect(500)
      .expect('Content-Type', /text\/html/, done);
  });

  it('should respond with JSON', function(done) {
    return request(app).get('/500')
      .set('Accept', 'application/json')
      .expect(500)
      .expect('Content-Type', 'application/json', done);
  });

  it('should respond with text', function(done) {
    return request(app).get('/500')
      .set('Accept', 'text')
      .expect(500)
      .expect('Content-Type', 'text/plain')
      .expect('500: Internal Server Error', done);
  });

});
