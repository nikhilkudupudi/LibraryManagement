"use strict"

const {STRING,TEXT, UUID,UUIDV4,INTEGER,DATE}=require("sequelize");

module.exports={
    up:({context: {queryInterface}})=>{
        return queryInterface.changeColumn("books","isbn",{
            type: INTEGER,
            unique: true,
            allowNull: false,
        })
    },
    down:({context:{queryInterface}})=>{
        return queryInterface.changeColumn("books","isbn",{
            type: INTEGER,
            unique: false,
            allowNull: false,
        });
    },
}