'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const hashedPasswordDumy = await bcrypt.hash('password', 10);

     await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        password: hashedPasswordDumy,
        email: "jhondoe@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
     },
      {
        name: 'Jane dae',
        password: hashedPasswordDumy,
        email: "jhondae@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('Users', null, {});
  }
};
