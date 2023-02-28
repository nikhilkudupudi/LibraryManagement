'use strict';

const { UUIDV4,DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context:{queryInterface}}, Sequelize) {
    return await queryInterface.createTable("users",{
      id:{
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: UUIDV4
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM({
            values:["student","staff","admin"]
        }),
        allowNull: false,
        
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    loans:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: null
        
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull:false
  },
  updatedAt:{
      type: DataTypes.DATE,
      allowNull: false
  },
        
    })

  },

  async down (queryInterface, Sequelize) {
  return await queryInterface.dropTable("users");
  }
};
