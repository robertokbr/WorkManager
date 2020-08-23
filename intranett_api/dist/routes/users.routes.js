"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _CreateUserService = _interopRequireDefault(require("../services/CreateUserService"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
usersRouter.post('/', async (request, response) => {
  const {
    name,
    password,
    isManager
  } = request.body;
  const createUser = new _CreateUserService.default();
  const user = await createUser.execute({
    name,
    password,
    isManager
  });
  delete user.password;
  return response.json(user);
});
usersRouter.get('/', async (request, response) => {
  const userRepository = (0, _typeorm.getRepository)(_User.default);
  const allUsers = (await userRepository.find()).map(user => {
    delete user.password;
    return user;
  });
  return response.json(allUsers);
});
var _default = usersRouter;
exports.default = _default;