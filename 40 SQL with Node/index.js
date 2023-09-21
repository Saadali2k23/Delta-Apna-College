const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

const { faker } = require('@faker-js/faker');
const mysql = require("mysql2")
const sql = require('./sql');
const { connect } = require("http2");
 
const getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}

app.get("/", (req, res) => {
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"delta_app",
        password:"root"
    })

    // const data = []
    // for (let i=0;i<10;i++){
    //     data.push(getRandomUser())
    // }
    // sql.Delete(connection)
    // sql.insertMany(connection,data)
    
    sql.runCommand(connection, "SELECT count(*) FROM USER", ( err,results) => {
        const users = `${results[0]['count(*)']}`
        res.render("index",{users});
    });
});

app.get("/users/new", (req, res) => {
    res.render("new");
});

app.post("/users", (req, res) => {
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"delta_app",
        password:"root"
    })
    const user = req.body;
    user.id = uuidv4()
    sql.insert(connection,[user.id,user.username,user.email,user.password])
    res.redirect("/users")
});

app.get("/users", (req, res) => {
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"delta_app",
        password:"root"
    })
    // const data = []
    // for (let i=0;i<100;i++){
    //     data.push(getRandomUser())
    // }

    // sql.Delete(connection)
    // sql.insertMany(connection,data)
    sql.runCommand(connection, "SELECT * FROM USER", ( err,results) => {
        results.forEach(res => {
            delete(res.password)
        });
        res.render("users",{users:results});
    });
});

app.post("/users/addrandom", (req, res) => {
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"delta_app",
        password:"root"
    })
    const data = []
    for (let i=0;i<parseInt(req.body['no']);i++){
        data.push(getRandomUser())
    }
    sql.insertMany(connection,data)
    res.redirect('/users')
});

app.delete("/users/:id", (req, res) => {
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"delta_app",
        password:"root"
    })
    sql.DeleteSpecific(connection,req.params.id)
    res.redirect("/users");
});

app.get("/users/:id/edit", (req, res) => {
    res.render("edit",{id:req.params.id});
});

app.patch("/users/:id", (req, res) => {
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"delta_app",
        password:"root"
    })
    const id = req.params.id;
    try{
        connection.query(
            `SELECT password FROM user where id='${id}'`,
            (err,results)=>{
                if(err) throw err;
                if (results[0].password == req.body.password ){
                    sql.updateUsername(connection, req.params.id ,req.body.username,req.body.password);
                    res.redirect("/users")
                }else{
                    res.send("Invalid Password")
                }
            }
        )
    }catch(err){
        console.log(err);
    }
    
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
})