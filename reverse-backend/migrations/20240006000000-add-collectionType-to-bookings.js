'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('bookings', 'collectionType', {
      type: Sequelize.ENUM('HOUSEHOLD', 'APARTMENT', 'OFFICE', 'RETAIL_STORE', 'RESTAURANT_CAFE'),
      allowNull: false,
      defaultValue: 'HOUSEHOLD', // temporary default so existing rows don't break
      after: 'customerId',       // MySQL: place column right after customerId
    });

    await queryInterface.addIndex('bookings', ['collectionType'], {
      name: 'idx_bookings_collectionType',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('bookings', 'idx_bookings_collectionType');
    await queryInterface.removeColumn('bookings', 'collectionType');
  },
};
