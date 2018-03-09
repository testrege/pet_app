let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.model('Animal',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1,
        maxlength:255
    },
    typeOfAnimal:{
        type:String,
        required:true,
        minlength:1,
        maxlength:255
    },
    breed:{
        type:String,
        required:true,
        default: "unknown",
        minlength:1,
        maxlength:255
    }, 
    age:{
        type:Number,
        required:true,
        default: 99,
    },
    gender:{
        type:String,
        required:true,
        minlength:1,
        maxlength:255
    },
    description:{
        type:String,
        required:true,
        minlength:1,
        maxlength:1000
    },
    adoptionFee:{
        type:Number,
        required:true,
        default: 0,
    },
    _shelter:{type:ObjectId,ref:"Shelter"},
    _users:[{type:ObjectId, ref:"Users"}]
},{timestamps:true}));