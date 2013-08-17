
/**
 * Module Dependencies
 */

var _ = require('underscore');

/**
 * 404: Not Found Middleware
 * @param  {Object|String} config
 * @return {Function}        Express Middleware Function
 */
var notFound = module.exports.notFound = function(config) {

  if(!config) config = {};
  if(typeof config === 'string') config = { name: config };

  var defaultConfig = {
    type: 'file',
    message: 'Not Found',
    logger: false
  };

  _.defaults(config, defaultConfig);

  config.name = (config.name) ?
    config.name : ((config.type === 'file') ? __dirname + '/errors/404.html' : '404');

  return function(req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
      if(config.type === 'file') {
        res.sendfile(config.name);
      } else {
        res.render(config.name, { url: req.url });
      }
    } else if (req.accepts('json')) {
      res.send({ error: 'Not found' });
    } else {
      res.type('txt').send('404: ' + config.message);
    }

    if(config.logger && typeof config.logger === 'function') config.logger(req, res);
  };
};


/**
 * 500: Internal Server Error Middleware
 * @param  {Object|String} config
 * @return {Function}        Express Middleware Function
 */
var error = module.exports.error = function(config) {

  if(!config) config = {};
  if(typeof config === 'string') config = { name: config };

  var defaultConfig = {
    type: 'file',
    message: 'Internal Server Error',
    logger: false
  };

  _.defaults(config, defaultConfig);

  config.name = (config.name) ?
    config.name : ((config.type === 'file') ? __dirname + '/errors/500.html' : '500');


  return function(err, req, res, next) {
    res.status(500);

    if (req.accepts('html')) {
      if(config.type === 'file') {
        res.sendfile(config.name);
      } else {
        res.render(config.name, { url: req.url });
      }
    } else if (req.accepts('json')) {
      res.send({ error: 'Not found' });
    } else {
      res.type('txt').send('500: ' + config.message);
    }

    if(config.logger && typeof config.logger === 'function') config.logger(err, req, res);
  };
};

