"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../models/User"));

var _Team = _interopRequireDefault(require("../models/Team"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateTeamService {
  async execute({
    manager_id,
    users_id
  }) {
    const userRepository = (0, _typeorm.getRepository)(_User.default);
    const teamRepository = (0, _typeorm.getRepository)(_Team.default);
    const checkIfUserIsManager = await userRepository.findOne({
      where: {
        id: manager_id
      }
    });

    if (!checkIfUserIsManager || checkIfUserIsManager.isManager === false) {
      throw new Error('User need to be a manager to create a team!');
    }

    const team = users_id.map(user => teamRepository.create({
      user_id: user,
      manager_id
    }));
    const teamArray = await teamRepository.save(team);
    return teamArray;
  }

}

var _default = CreateTeamService;
exports.default = _default;