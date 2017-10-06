'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./schema');

var _config = require('./config.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_config.api, (0, _expressGraphql2.default)({
  schema: _schema.schema,
  graphiql: false
}));

var server = app.listen(_config.port, function () {
  console.log('App is running. Navigate to http://' + _config.host + ':' + _config.port + _config.api);
});
//# sourceMappingURL=index.js.map