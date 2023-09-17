const express = require("express");
const app = express();
const path = require("path")

app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/rollDice",(req,res)=>{
    res.render("rolldice",{num:Math.floor(Math.random()*6)+1})
})

app.get("/instagram/:username",(req,res)=>{
    const username = req.params.username
    const users = require("./data.json")
    const data = users[username]
    res.render("instagram",{username,data:data?data:null})
})

const port = 3000;
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})