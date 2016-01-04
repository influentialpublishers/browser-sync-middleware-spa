
var fs  = require('fs');
var URL = require('url');
var FILE_STREAM_OPTIONS = { encoding: 'utf8' };

function Spa(urlPathRegex, htmlFilePath) {

  return function middleware(req, res, next) {

    var url       = URL.parse(req.originalUrl);

    if (urlPathRegex.test(url.pathname)) {

      var stream  = fs.createReadStream(htmlFilePath, FILE_STREAM_OPTIONS);
      stream.on('error', function(msg) {
        next(msg);
      });

      stream.pipe(res);

    } else {
      next();
    }

  };
}

module.exports  = Spa;
