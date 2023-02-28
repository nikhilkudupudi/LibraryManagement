'use strict';
const {create_fake_Loans}=require("../faker");
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
      return await queryInterface.bulkInsert('loans',create_fake_Loans());
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
      await queryInterface.bulkDelete('People', null, {});
     */
  }
};
