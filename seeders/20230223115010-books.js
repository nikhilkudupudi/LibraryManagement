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
      return await queryInterface.bulkInsert('books',[{
        id: "0d2c3347-ef61-4e16-b1f8-942ccf11b84e",
        title: "The Catcher in the Rye",
        authorname: "J.D. Salinger",
        description: "A novel about teenage alienation and loss of innocence in the 1950s",
        isbn: 9780316769174,
        edition: "First Edition",
        genre: "Literary Fiction",
        num_of_pages: 277,
        createdAt:new Date(),
        updatedAt:new Date(),
        }
        ,
        {
        id: "5786cde4-1a31-4f9c-a4e4-628c6cb42b6f",
        title: "To Kill a Mockingbird",
        authorname: "Harper Lee",
        description: "A novel about racism and injustice in a small town in the 1930s",
        isbn: 9780446310789,
        edition: "50th Anniversary Edition",
        genre: "Classic Fiction",
        num_of_pages: 281,
        createdAt:new Date(),
        updatedAt:new Date(),
        }
        ,
        {
        id: "8ba7d28e-b527-44a5-9e21-cf11c0d9293d",
        title: "The Great Gatsby",
        authorname: "F. Scott Fitzgerald",
        description: "A novel about the decadent and corrupt world of the wealthy in the 1920s",
        isbn: 9780743273565,
        edition: "Reissue Edition",
        genre: "Literary Fiction",
        num_of_pages: 180,
        createdAt:new Date(),
        updatedAt:new Date(),
        }
        ,
        {
        id: "b4fc9350-1d52-4e54-9c0e-468f6aaf4616",
        title: "Pride and Prejudice",
        authorname: "Jane Austen",
        description: "A novel about the social mores and romantic entanglements of a group of English gentry",
        isbn: 9780486284736,
        edition: "Reissue Edition",
        genre: "Romance",
        num_of_pages: 352,
        createdAt:new Date(),
        updatedAt:new Date(),
        }
        ,
        {
        id: "4e17a303-cc0d-4b07-88a4-688d4e9e3278",
        title: "1984",
        authorname: "George Orwell",
        description: "A dystopian novel about a totalitarian society under constant surveillance",
        isbn: 9780451524935,
        edition: "Centennial Edition",
        genre: "Science Fiction",
        num_of_pages: 328,
        createdAt:new Date(),
        updatedAt:new Date(),
        }
        ,
        {
        id: "71e1edee-16c9-4d0c-8a5a-fda5c32d7f03",
        title: "The Hobbit",
        authorname: "J.R.R. Tolkien",
        description: "A fantasy novel about a hobbit who goes on an adventure to reclaim treasure from a dragon",
        isbn: 9780547928227,
        edition: "75th Anniversary Edition",
        genre: "Fantasy",
        num_of_pages: 320,
        createdAt:new Date(),
        updatedAt:new Date(),
        },
        
        ]);}
      catch(err){console.log(err);}
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('books', null, {});
  }
};
