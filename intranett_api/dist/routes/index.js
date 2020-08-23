"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("./users.routes"));

var _sessions = _interopRequireDefault(require("./sessions.routes"));

var _task = _interopRequireDefault(require("./task.routes"));

var _team = _interopRequireDefault(require("./team.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/session', _sessions.default);
routes.use('/task', _task.default);
routes.use('/team', _team.default);
routes.use('/user', _users.default);
var _default = routes;
exports.default = _default;