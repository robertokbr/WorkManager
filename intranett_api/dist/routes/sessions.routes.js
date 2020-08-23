"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AuthenticateUserService = _interopRequireDefault(require("../services/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
sessionsRouter.post('/', async (request, response) => {
  const {
    name,
    password
  } = request.body;
  const authenticate = new _AuthenticateUserService.default();
  const {
    user,
    token
  } = await authenticate.execute({
    password,
    name
  });
  delete user.password;
  return response.json({
    user,
    token
  });
});
var _default = sessionsRouter;
exports.default = _default;