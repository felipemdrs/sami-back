  
const glob      = require('glob');
const _         = require('lodash');
const path      = require('path');
const pluralize = require('pluralize');
const Router    = require('restify-router').Router;

module.exports = (app) => {
  const routes = glob.sync(__dirname + '/../services/**/*route.js', {});

  _.each(routes, (file) => {
    let routeName = path.basename(file, '.route.js');
    let router = new Router();

    require(file)(router);

    router.applyRoutes(app, '/' + pluralize(routeName));
  });
};
