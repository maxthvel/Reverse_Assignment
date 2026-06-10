'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      pickupAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      packageCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      priority: {
        type: Sequelize.ENUM('NORMAL', 'HIGH'),
        allowNull: false,
        defaultValue: 'NORMAL',
      },
      scheduledAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('bookings', ['status'],      { name: 'idx_bookings_status' });
    await queryInterface.addIndex('bookings', ['priority'],    { name: 'idx_bookings_priority' });
    await queryInterface.addIndex('bookings', ['customerId'],  { name: 'idx_bookings_customerId' });
    await queryInterface.addIndex('bookings', ['scheduledAt'], { name: 'idx_bookings_scheduledAt' });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('bookings', 'idx_bookings_status');
    await queryInterface.removeIndex('bookings', 'idx_bookings_priority');
    await queryInterface.removeIndex('bookings', 'idx_bookings_customerId');
    await queryInterface.removeIndex('bookings', 'idx_bookings_scheduledAt');
    await queryInterface.dropTable('bookings');
  },
};
