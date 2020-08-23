"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Task = _interopRequireDefault(require("../models/Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateTaskService {
  async execute({
    task_id,
    finished_at,
    cancellationReason
  }) {
    const taskRepository = (0, _typeorm.getRepository)(_Task.default);
    const task = await taskRepository.findOne({
      where: {
        id: task_id
      }
    });

    if (!task) {
      throw new Error('Reload your application to update task');
    }

    task.finished_at = finished_at || Date();
    task.status = 'Finalizada';

    if (cancellationReason) {
      task.cancellationReason = cancellationReason;
      task.status = 'Cancelada';
    }

    await taskRepository.save(task);
    return task;
  }

}

var _default = UpdateTaskService;
exports.default = _default;