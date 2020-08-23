"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateRelations1597756609409 {
  async up(queryRunner) {
    await queryRunner.createForeignKey('team', new _typeorm.TableForeignKey({
      name: 'managerKey',
      columnNames: ['manager_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('team', new _typeorm.TableForeignKey({
      name: 'UserKey',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('task', new _typeorm.TableForeignKey({
      name: 'UserTaskKey',
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('team', 'managerKey');
    await queryRunner.dropForeignKey('team', 'UserTaskKey');
    await queryRunner.dropForeignKey('task', 'UserKey');
  }

}

exports.default = CreateRelations1597756609409;