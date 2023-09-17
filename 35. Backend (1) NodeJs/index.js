const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use((req,res)=>{
    res.send("This is a default response")
    console.log("request recieved");
})

const port = 8080;
app.listen(port,()=>{
    console.log(`app is listening on poert ${port}`);
    console.log(`http://127.0.0.1:${port}`);
})