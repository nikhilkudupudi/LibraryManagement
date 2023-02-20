
const {Sequelize}=require('sequelize');
const { Umzug, SequelizeStorage } = require("umzug");

const SQL_DB_PATH=process.env['SQL_DB_PATH']||'./library.db';
const sequelize=new Sequelize({
    dialect: 'sqlite',
    storage: './dev.sqlite3',
    logging: false
});
// const sequelize=new Sequelize("sqlite::memory");
async function connectToDB(){
    
    try{
        await sequelize.authenticate();
        console.log("SQLite connectin established succesfully");
//await runAllMigrations();
        return sequelize;
    }
    catch(err){
        console.error("Unable to connect to the database",err);
        throw err;
    }
}

async function disconnectFromDB(){
    await sequelize.close();
    console.log("disconnected from the database");
}

async function runAllMigrations(){
    const migrator = new Umzug({
        migrations:{
            glob: ["migrations/*.js",{cwd: __dirname}]
        },
        context: sequelize,
        storage: new SequelizeStorage({
            sequelize
        }),
        logger: console
    })
    await migrator.up();
    console.log("all migrations performed successfully");
}

async function dropAllTables(){
    await sequelize.getQueryInterface().dropAllTables();
    console.log("Dropped all tables from databse");
}
module.exports={
    sequelize,
    connectToDB,
    runAllMigrations,
    dropAllTables,
    disconnectFromDB
}