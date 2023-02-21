
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require("umzug");

console.log("database", process.env['SQL_DB_PATH']);
let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env['SQL_DB_PATH'],
    logging: false
});


// const sequelize=new Sequelize("sqlite::memory");
async function connectToDB() {

    try {
        console.log("databse2", process.env['SQL_DB_PATH']);
        // sequelize=new Sequelize({
        //     dialect: 'sqlite',
        //     storage: process.env['SQL_DB_PATH'],
        //     logging: false
        // });
        
        await sequelize.authenticate();
        console.log("SQLite connectin established succesfully");
        console.log("databse2", process.env['SQL_DB_PATH']);
        await runAllMigrations();
        return sequelize;
    }
    catch (err) {
        console.error("Unable to connect to the database", err);
        throw err;
    }
}

async function disconnectFromDB() {
    await sequelize.close();
    console.log("disconnected from the database");
}

async function runAllMigrations() {
    const migrator = new Umzug({
        migrations: {
            glob: ["migrations/*.js", { cwd: __dirname }]
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

async function dropAllTables() {
    await sequelize.getQueryInterface().dropAllTables();
    console.log("Dropped all tables from databse");
}
module.exports = {
    sequelize,
    connectToDB,
    runAllMigrations,
    dropAllTables,
    disconnectFromDB
}