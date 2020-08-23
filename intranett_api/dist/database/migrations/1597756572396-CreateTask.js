"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTask1597756572396 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'task',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'userId',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'status',
        type: 'varchar'
      }, {
        name: 'started_at',
        type: 'timestamp'
      }, {
        name: 'finished_at',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'cancellationReason',
        type: 'varchar',
        isNullable: true
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('task');
  }

}

exports.default = CreateTask1597756572396;