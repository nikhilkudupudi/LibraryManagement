'use strict';
const {create_fake_Books}=require("../faker");
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
      //console.log(create_fake_Books(),"hello");
      try{
      return await queryInterface.bulkInsert('books',create_fake_Books(),{});}
      catch(err){console.log(err);}
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('books', null, []);
  }
};
