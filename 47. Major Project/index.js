const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const {data:sampleListing} = require("./SampleListing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  await mongoose.connect(MONGO_URL);
};

main()
  .then(() => {
    console.log("Connected to DB")
  })
  .catch((err) => {
    console.log(err)
  });

app.get("/", (req, res) => {
  Listing.insertMany(sampleListing)
  // Listing.find().then(res=>{
  //   console.log(res);
  // })
  res.send("It is working");
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
