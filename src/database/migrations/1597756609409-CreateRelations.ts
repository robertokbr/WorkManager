import {
    MigrationInterface,
    QueryRunner,
    TableForeignKey,
  } from 'typeorm';
  
export class CreateRelations1597756609409 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createForeignKey(
          'team',
          new TableForeignKey({
            name: 'ProviderKey',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }),
        );
        await queryRunner.createForeignKey(
          'team',
          new TableForeignKey({
            name: 'UserKey',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }),
        )
          await queryRunner.createForeignKey(
            'task',
            new TableForeignKey({
              name: 'UserTaskKey',
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('team', 'ProviderKey');
        await queryRunner.dropForeignKey('team', 'UserTaskKey');
        await queryRunner.dropForeignKey('task', 'UserKey');
    
      }
}
