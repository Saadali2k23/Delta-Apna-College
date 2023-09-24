const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat")
const method_override = require("method-override");
const chat = require("./models/chat");

app.set('view engine',"ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")));
app.use(method_override("_method"))
app.use(express.urlencoded({ extended: true }));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const currUser = "Pulkit";
const currReciever = "Elon Musk";

main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  res.render("index",{messages: await Chat.find({}),user:currUser});
});

app.patch("/messages", async (req, res) => {
  await new Chat({
    sentFrom: req.body.sentFrom,
    sentTo: req.body.sentTo,
    message:req.body.message,
    instance:Date.now()
  }).save()
  res.redirect("/")
});

app.get("/message/edit", async (req, res) => {
  const chatObj = await Chat.findById(req.params.id);
  console.log(chatObj);
  res.render("index",{messages: await Chat.find({}),user:currUser});
});

app.get("/message/:id/edit", async (req, res) => {
  Chat.findById(req.params.id).then(msg=>{
    res.render("message",{msg,user:currUser})
  });
});

app.patch("/message/:id", async (req, res) => {
  Chat.findByIdAndUpdate((req.params.id),{message:req.body.msg},{new:true}).then(()=>{
    res.redirect("/")
  })
});

app.delete("/message/:id", async (req, res) => {
  Chat.findByIdAndDelete(req.params.id).then(res=>{
    console.log(res);
  })
  res.redirect("/")
});

app.listen(3001, () => {
  console.log("app is listening on port 3000");
});