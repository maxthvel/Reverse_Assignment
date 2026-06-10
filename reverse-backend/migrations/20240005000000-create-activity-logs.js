'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      bookingId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'bookings',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      action: {
        type: Sequelize.ENUM(
          'BOOKING_CREATED',
          'STATUS_CHANGED',
          'DRIVER_ASSIGNED',
          'DRIVER_UNASSIGNED',
          'PRIORITY_ESCALATED',
          'BOOKING_CANCELLED'
        ),
        allowNull: false,
      },
      fromValue: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      toValue: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      performedBy: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // No updatedAt — activity logs are immutable
    });

    await queryInterface.addIndex('activity_logs', ['bookingId'], { name: 'idx_activity_logs_bookingId' });
    await queryInterface.addIndex('activity_logs', ['action'],    { name: 'idx_activity_logs_action' });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('activity_logs', 'idx_activity_logs_bookingId');
    await queryInterface.removeIndex('activity_logs', 'idx_activity_logs_action');
    await queryInterface.dropTable('activity_logs');
  },
};
