"use strict"

const {STRING,TEXT, UUID,UUIDV4,INTEGER,DATE}=require("sequelize");

module.exports={
    up:({context: {queryInterface}})=>{
        return queryInterface.createTable("books",{
            id:{
                type: UUID,
                primaryKey:true,
                defaultValue: UUIDV4
            },
            title:{
                type: STRING,
                allowNull: false
            },
            authorname:{
                type: STRING,
                allowNull:false
            },
            description:{
                type: TEXT,
                allowNull: true
            },
            isbn:{
                type: INTEGER,
                allowNull:false,
                
                
            },
            edition:{
                type: STRING,
                allowNull: true,
                
            },
            genre:{
                type: STRING,
                allowNull:true
            },
            num_of_pages:{
                type: INTEGER,
                default:1
            },
            createdAt:{
                type: DATE,
                allowNull:false,
                
            },
            updatedAt:{
                type:DATE,
                allowNull: false,
                
            },

        })
    },
    down:({context:{queryInterface}})=>{
        return queryInterface.dropTable("books");
    },
}