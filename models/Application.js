const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    babyName:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    age:{
        type:Number,
        trim:true
    },
    location:{
        type:String,
        trim:true
    },
    timeOfArrival:{
        type:String,
        trim:true
    },
    parentsName:{
        type:String,
        trim:true
    },
    amount:{
        type:Number,
        trim:true
    },
    periodOfStay:{
        type:String,
        trim:true
    },
    babyNumber:{
        type:String,
        trim:true
    }
});

module.exports = mongoose.model("Application", applicationSchema)