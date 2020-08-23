"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _CreateTeamService = _interopRequireDefault(require("../services/CreateTeamService"));

var _Team = _interopRequireDefault(require("../models/Team"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const teamRouter = (0, _express.Router)();
teamRouter.use(_ensureAuthenticated.default);
teamRouter.post('/', async (request, response) => {
  const {
    manager_id,
    users_id
  } = request.body;
  const creaetTeam = new _CreateTeamService.default();
  const team = await creaetTeam.execute({
    manager_id,
    users_id
  });
  return response.json(team);
});
teamRouter.get('/:manager_id', async (request, response) => {
  const {
    manager_id
  } = request.params;
  const teamRepository = (0, _typeorm.getRepository)(_Team.default);
  const team = await teamRepository.find({
    where: {
      manager_id
    }
  });
  const users = team.map(teamUser => {
    delete teamUser.user.password;
    return teamUser.user;
  });
  return response.json({
    members: users
  });
});
var _default = teamRouter;
exports.default = _default;