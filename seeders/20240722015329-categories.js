'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categories', [
      {
        nameCategory: 'Technology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameCategory: 'Science',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameCategory: 'Health',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
