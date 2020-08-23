"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Task = _interopRequireDefault(require("../models/Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateTaskService {
  async execute({
    taskName,
    user_id,
    started_at
  }) {
    const taskRepository = (0, _typeorm.getRepository)(_Task.default);

    if (!started_at) {
      started_at = Date();
    }

    const task = taskRepository.create({
      name: taskName,
      userId: user_id,
      started_at,
      status: 'Andamento'
    });
    await taskRepository.save(task);
    return task;
  }

}

var _default = CreateTaskService;
exports.default = _default;