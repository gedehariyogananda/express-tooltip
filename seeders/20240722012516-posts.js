'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
        {
          title: "ajkdhawd",
          description: "ceked",
          userId: 1,
          categoryId: 1,
        },
        {
          title: "ajkdhawd",
          description: "ceked",
          userId:1,
          categoryId: 2,
        },
        {
          title: "ajkdhawd",
          description: "ceked",
          userId:1,
          categoryId: 2,
        },
        {
          title: "ajkdhawd",
          description: "ceked",
          userId:3,
          categoryId:1,
        }

    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Posts', null, {});
  }
};
