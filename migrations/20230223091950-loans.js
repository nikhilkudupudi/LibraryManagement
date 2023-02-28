'use strict';
const {DataTypes}=require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context:{queryInterface}}, Sequelize) {
    return await queryInterface.createTable("loans",{
      id:{
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookid:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
   title:{
    type: DataTypes.STRING,
    allowNull: false
   },
   date:{
    type: DataTypes.STRING,
    allowNull: false,
    
   },
   period:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
   },
   isActive:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
   },
   createdAt:{
    type: DataTypes.DATE,
    allowNull:false
},
updatedAt:{
    type: DataTypes.DATE,
    allowNull: false
},
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable("loans");
  }
};
