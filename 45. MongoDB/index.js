const mongoose = require('mongoose');
const { Schema } = mongoose;

const main = async () => { 
    return await mongoose.connect('mongodb://127.0.0.1:27017/test');
} 

main()
    .then(()=>{
        console.log("connection was succesfull");
    })
    .catch((err)=>{
        console.log(err);
    })

const userSchema = new Schema({
    name:String,
    email:String,
    age:Number
})

const User = mongoose.model("User",userSchema);

// User.insertMany([
//     {
//         name:"Pulkit",
//         email:"kpulkit15234@gmail.com",
//         age:19
//     },
//     {
//         name:"Naman",
//         email:"Naman@gmail.com",
//         age:19
//     },
//     {
//         name:"Nishchal",
//         email:"Nishchal@gmail.com",
//         age:19
//     }
// ]).then(res=>{
//     console.log(res);
// })

User.find({}).then(res=>console.log(res))