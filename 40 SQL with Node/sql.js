const runCommand = (connection,query,values) => {
    try{
        values?
        connection.query(
            query,values,
            (err,results)=>{
                if(err) throw err;
                return results;
            }
        )
        :
        connection.query(
            query,
            (err,results)=>{
                if(err) throw err;
                return results;
            }
        )
    }catch(err){
        console.log(err);
    }
}

const insert = (connection,value) => {
    try{
        connection.query(
            "INSERT INTO user VALUES(?,?,?,?)",value,
            (err,results)=>{
                if(err) throw err;
                console.log("record added successfully");
            }
        )
    }catch(err){
        console.log(err);
    }
}
const insertMany = (connection,values) => {
    try{
        connection.query(
            "INSERT INTO user VALUES ?",[values],
            (err,results)=>{
                if(err) throw err;
                console.log("All records added successfully");
            }
        )
    }catch(err){
        console.log(err);
    }
}

const getUsers = (connection) => {
    try{
        connection.query(
            "SELECT * FROM user",
            (err,results)=>{
                if(err) throw err;
                console.log(results);
            }
        )
    }catch(err){
        console.log(err);
    }
}

const DeleteSpecific = (connection,id) => {
    try{
        connection.query(
            `DELETE FROM user where id='${id}'`,
            (err,results)=>{
                if(err) throw err;
                console.log("record deleted successfully");
            }
        )
    }catch(err){
        console.log(err);
    }
}

const Delete = (connection) => {
    try{
        connection.query(
            "DELETE FROM user",
            (err,results)=>{
                if(err) throw err;
                console.log("All records deleted successfully");
            }
        )
    }catch(err){
        console.log(err);
    }
}

const updateUsername = (connection,id,newusername,password) => {
    try{
        runCommand(connection,`update user set username='${newusername}' where id='${id}'`)
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    runCommand,
    insert,
    insertMany,
    getUsers,
    Delete,
    DeleteSpecific,
    updateUsername
};