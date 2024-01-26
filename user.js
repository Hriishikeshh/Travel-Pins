const mongoose=require("mongoose");
const userschema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:50,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        min:6,
        max:50,
    },
},
    {timestamps:true}
);

module.exports = mongoose.model("user",userschema);