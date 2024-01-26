const router = require("express").Router();
const pin = require("../models/pin");

//create pin

router.post("/",async(req,res)=>{
    const newpin=new pin(req.body);

    try{
        const savedpin = await newpin.save();
        res.status(200).json(savedpin);

    }catch(err){
        res.status(500).json(err);
    }
})

//get all pins

router.get("/",async(req,res)=>{
    try{
        const pins = await pin.find();
        res.status(200).json(pins);

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router