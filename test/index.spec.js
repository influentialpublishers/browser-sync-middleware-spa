
var fs              = require('fs');
var assert          = require('assert');
var Writable        = require('stream').Writable;
var Spa             = require('../index');
var TEST_FILE_PATH  = __dirname + '/test.html';

function getMockWriteStream() {
  var mock    = Writable();
  mock._write = function(chunk, encoding, next) {
    this.emit('data', chunk);
    next();
  };

  return mock;
}

describe('Browser Sync Middleware for SPA Apps', function() {

  it('should return a function with an arity of 3', function() {
    var target  = Spa(/.*/, TEST_FILE_PATH);
    assert.equal(target.length, 3);
  });

  it('should call next when `req.originalURL` doesn\'t match the given regex',
  function(done) {
    var spa = Spa(/^doesnotmatch$/, TEST_FILE_PATH);
    var testRequest = { originalUrl: 'nope' };

    spa(testRequest, {}, function(err) {
      assert.equal(err, undefined);
      return done();
    });
  });

  it('should call next with an error when `req.originalUrl` matches the ' +
  'given RegExp and the file does not exist', function(done) {
    var spa = Spa(/.*/, __dirname + '/does/not/exist.html');
    var testRequest   = { originalUrl: 'anything/will/work' };
    var mockResponse  = getMockWriteStream();

    spa(testRequest, mockResponse, function(err) {
      assert.equal(err.code, 'ENOENT');
      return done();
    });
  });

  it('should serve the file when `req.originalUrl` matches the given RegExp',
  function(done) {
    var spa = Spa(/.*/, TEST_FILE_PATH);
    var testRequest   = { originalUrl: 'anything/will/work' };
    var mockResponse  = getMockWriteStream();
    var servedData    = '';

    mockResponse.on('data', function(msg) {
      servedData += msg;
    });

    mockResponse.on('finish', function() {
      fs.readFile(TEST_FILE_PATH, { encoding: 'utf8' }, function(err, data) {
        assert.equal(servedData, data);
        return done();
      });
    });

    spa(testRequest, mockResponse, function(err) {
      return done('Unexpected `next` call! ' + err.toString());
    });
  });

});
