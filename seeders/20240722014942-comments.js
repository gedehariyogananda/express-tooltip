'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Comments', [
      {
        comment: 'This is a comment elek',
        postId: 1,
        userId: 1,
      },
      {
        comment: 'this elek',
        postId: 1,
        userId:2
      },
      {
        comment: 'adawd',
        postId: 2,
        userId:3
      }
     ], {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Comments', null, {});

  }
};
