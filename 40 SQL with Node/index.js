const { faker, da } = require('@faker-js/faker');
const mysql = require("mysql2")

const createRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"delta_app",
    password:"root"
})

const runCommand = (query,values) => {
    try{
        values?
        connection.query(
            query,values,
            (err,results)=>{
                if(err) throw err;
                console.log(results);
            }
        )
        :
        connection.query(
            query,
            (err,results)=>{
                if(err) throw err;
                console.log(results);
            }
        )
    }catch(err){
        console.log(err);
    }
}

const insert = (value) => {
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
                console.log("All records deleted successfully");
const insertMany = (values) => {
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

const select = () => {
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

const Delete = () => {
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

const data = []
for (let i=0;i<2000;i++){
    data.push(createRandomUser())
}

Delete();
insertMany(data)

connection.end()