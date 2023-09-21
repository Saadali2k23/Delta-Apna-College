const { faker } = require('@faker-js/faker');
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"delta_app",
    password:"root"
})

try{
    connection.query(
        "show tables",
        (err,results)=>{
            if(err) throw err;
            console.log(results);
        }
    )
}catch(err){
    console.log(err);
}

connection.end()

const createRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}