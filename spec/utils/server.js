const {connectToDB,disconnectFromDB, dropAllTables}=require("../../database");

async function startDBServer(){
    console.log("Starting DBServer");
    try{
       
       
       process.env['SQL_DB_PATH'] = 'test.sqlite3';
       console.error("server",process.env['SQL_DB_PATH']);
       await connectToDB();
    }
    catch (err){
        console.error(err);
    }
}

async function stopDBServer(){
    try{
        await dropAllTables();
        await disconnectFromDB();
        await new Promise((resolve)=> setTimeout(resolve, 1000));
    }
    catch(err){
        console.error(err);
    }
}

module.exports={
    startDBServer,
    stopDBServer
}