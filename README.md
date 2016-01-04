[![Build Status](https://travis-ci.org/influentialpublishers/browser-sync-middleware-spa.svg)](https://travis-ci.org/influentialpublishers/browser-sync-middleware-spa)
[![Coverage Status](https://coveralls.io/repos/influentialpublishers/browser-sync-middleware-spa/badge.svg?branch=master&service=github)](https://coveralls.io/github/influentialpublishers/browser-sync-middleware-spa?branch=master)

# browser-sync-middleware-spa
A single page application middleware for the BrowserSync server.


## Parameters

### `urlPathRegex`
This must be a regular expression.  It will be matched against the
`req.originalUrl` value.  If the URL matches then the provided HTML
file will be served.

### `htmlFilePath`
This must be an absolute path the your web application's main (index.html)
file.  This file will be served whenever the given `urlPathRegex` matches
the `req.originalUrl`

## Usage

```javascript
  var browserSync     = require('browser-sync').create();
  var browserSyncSpa  = require('browser-sync-middleware-spa');
  var baseDir         = __dirname + '/_public/index.html';

  browserSync.init({
    server: {
      baseDir: __
      middleware: [
        browserSyncSpa(/^[^\.]+$/, baseDir),
      ]
    },
  };
```
