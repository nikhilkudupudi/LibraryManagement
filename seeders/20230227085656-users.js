'use strict';
const {create_fake_Users}=require("../faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context:{queryInterface}}, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try{
        return await  queryInterface.bulkInsert('users',create_fake_Users());
    }
    catch(err){
     console.error(err);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
