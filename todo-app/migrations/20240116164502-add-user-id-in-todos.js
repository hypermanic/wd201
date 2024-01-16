/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the column already exists before trying to add it
    const tableInfo = await queryInterface.describeTable('Todos');
    if (!tableInfo['userId']) {
      await queryInterface.addColumn('Todos', 'userId', {
        type: Sequelize.DataTypes.INTEGER,
      });
    }

    // Check if the foreign key constraint already exists before trying to add it
    const foreignKeys = await queryInterface.getForeignKeysForTables(['Todos']);
    const hasForeignKey = foreignKeys['Todos'] && foreignKeys['Todos'].some(fk => fk.columnName === 'userId');
    if (!hasForeignKey) {
      await queryInterface.addConstraint('Todos', {
        fields: ['userId'],
        type: 'foreign key',
        references: {
          table: 'Users',
          field: 'id',
        },
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Todos', 'userId');
  }
};
