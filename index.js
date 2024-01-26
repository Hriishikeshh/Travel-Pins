const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const pinroute = require("./routes/pins");
const userRoute = require("./routes/users");
const app=express();

dotenv.config();

app.use(express.json());   //to parcel the body for post request

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>console.log("error :" ,err));


app.use("/api/pins",pinroute);
app.use("/api/users",userRoute);

app.listen(8800,()=>{
    console.log("backend server running");
})