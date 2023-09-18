const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true})) // to make express understand encoded url as data is sent in body of a post request
app.use(express.json()) //to make express understand json

app.get("/",(req,res)=>{
    console.log(req.query);
    res.send("Request Recieved")
})

app.post("/",(req,res)=>{
    console.log(req.body);
    res.send("Request Recieved")
})

const port = 3000;
app.listen(port,()=>{
    console.log(`app is listening at post ${port}`);
});