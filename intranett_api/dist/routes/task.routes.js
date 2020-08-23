"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _CreateTaskService = _interopRequireDefault(require("../services/CreateTaskService"));

var _UpdateTaskService = _interopRequireDefault(require("../services/UpdateTaskService"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _Task = _interopRequireDefault(require("../models/Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const taskRouter = (0, _express.Router)();
taskRouter.use(_ensureAuthenticated.default);
taskRouter.get('/:id', async (request, response) => {
  const {
    id
  } = request.params;
  const taskRepository = (0, _typeorm.getRepository)(_Task.default);
  const task = await taskRepository.find({
    where: {
      userId: id
    }
  });
  return response.json(task);
});
taskRouter.post('/', async (request, response) => {
  const {
    taskName,
    started_at
  } = request.body;
  const {
    id
  } = request.user;
  const createTask = new _CreateTaskService.default();
  const task = await createTask.execute({
    taskName,
    user_id: id,
    started_at
  });
  return response.json(task);
});
taskRouter.put('/', async (request, response) => {
  const {
    task_id,
    cancellationReason,
    finished_at
  } = request.body;
  const updateTask = new _UpdateTaskService.default();
  const newTask = await updateTask.execute({
    task_id,
    cancellationReason,
    finished_at
  });
  return response.json(newTask);
});
var _default = taskRouter;
exports.default = _default;