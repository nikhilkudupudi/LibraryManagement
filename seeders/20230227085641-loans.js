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
      return await queryInterface.bulkInsert('loans',[
        {
          id: "e8a57a06-66b7-41ea-bf0a-7cc7781d3855",
          username: "JohnDoe",
          bookid: 1234,
          title: "The Catcher in the Rye",
          date: "2023-02-28",
          period: 14,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
          }
          ,
          {
          id: "d0a320d4-4f4a-4d72-b5ea-9e190d2a2a08",
          username: "JaneSmith",
          bookid: 5678,
          title: "To Kill a Mockingbird",
          date: "2023-03-05",
          period: 7,
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
          }
          ,
          {
          id: "296514d9-51e3-49d3-828d-85309e2f1379",
          username: "BobJohnson",
          bookid: 9012,
          title: "The Great Gatsby",
          date: "2023-03-10",
          period: 21,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
          }
          ,
          {
          id: "b13659d2-2e68-4769-94e8-9e72dbfb7c04",
          username: "SaraLee",
          bookid: 3456,
          title: "Pride and Prejudice",
          date: "2023-03-15",
          period: 14,
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
          }
          ,
          {
          id: "29f6c7cc-79a2-4e53-9d58-0400bfbd63e6",
          username: "MarkJones",
          bookid: 7890,
          title: "1984",
          date: "2023-03-20",
          period: 28,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
          }
      ]);
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
    await queryInterface.dropTable("books",null,{});
  }
};
