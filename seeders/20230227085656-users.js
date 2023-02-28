'use strict';

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
        return await  queryInterface.bulkInsert('users',[
          {
            id: "166bfe1a-78fd-463e-8dfc-956f9477d98c",
            username: "johndoe",
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            role: "student",
            address: "123 Main St, Anytown USA",
            password: "passw0rd!",
            phone: "555-123-4567",
            loans: 13,
            createdAt: new Date(),
            updatedAt: new Date()
            }
            ,
            {
            id: "6a53a6af-ae63-417a-b3c9-3ca1c0e4d4d4",
            username: "janedoe",
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@example.com",
            role: "staff",
            address: "456 Oak St, Anytown USA",
            password: "password123",
            phone: "555-555-5555",
            loans: null,
            createdAt: new Date(),
            updatedAt: new Date()
            }
            ,
            {
            id: "2b2a1b9c-8892-46d2-8b8a-5ab23d5b6f09",
            username: "bobsmith",
            firstName: "Bob",
            lastName: "Smith",
            email: "bobsmith@example.com",
            role: "student",
            address: "789 Elm St, Anytown USA",
            password: "abc123!",
            phone: "555-987-6543",
            loans: 9,
            createdAt: new Date(),
            updatedAt: new Date()
            }
            ,
            {
            id: "d3e6f16a-2182-4ed1-9f70-c04c200f8022",
            username: "sarahjones",
            firstName: "Sarah",
            lastName: "Jones",
            email: "sarahjones@example.com",
            role: "admin",
            address: "101 Main St, Anytown USA",
            password: "password456",
            phone: "555-555-1212",
            loans: null,
            createdAt: new Date(),
            updatedAt: new Date()
            }
        ]);
    }
    catch(err){
     console.error({message: err.message});
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.dropTable("users",null,{});
  }
};
