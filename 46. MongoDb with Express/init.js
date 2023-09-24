const mongoose = require("mongoose");
const Chat = require("./models/chat")

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

  const messages = [
    {
        sentFrom: "Pulkit",
        sentTo: "Elon Musk",
        message: "Hello, how are you?",
        instance: new Date()
    },
    {
        sentFrom: "Elon Musk",
        sentTo: "Pulkit",
        message: "I'm good, thanks! How about you?",
        instance: new Date()
    },
    {
        sentFrom: "Pulkit",
        sentTo: "Elon Musk",
        message: "I'm doing well too, thanks for asking!",
        instance: new Date()
    },
    {
        sentFrom: "Elon Musk",
        sentTo: "Pulkit",
        message: "That's great to hear!",
        instance: new Date()
    },
    {
        sentFrom: "Pulkit",
        sentTo: "Elon Musk",
        message: "What have you been up to lately?",
        instance: new Date()
    },
    {
        sentFrom: "Elon Musk",
        sentTo: "Pulkit",
        message: "Not much, just working and relaxing.",
        instance: new Date()
    },
    {
        sentFrom: "Pulkit",
        sentTo: "Elon Musk",
        message: "Sounds nice. Anything exciting happening?",
        instance: new Date()
    },
    {
        sentFrom: "Elon Musk",
        sentTo: "Pulkit",
        message: "Not really, just the usual stuff.",
        instance: new Date()
    },
    {
        sentFrom: "Pulkit",
        sentTo: "Elon Musk",
        message: "Well, let me know if anything interesting comes up!",
        instance: new Date()
    },
    {
        sentFrom: "Elon Musk",
        sentTo: "Pulkit",
        message: "Sure thing! Same goes for you.",
        instance: new Date()
    },
];

Chat.insertMany(messages)
    .then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err);
    })