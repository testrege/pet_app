let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.model('UserAnimal', new mongoose.Schema({
	_user:{type:ObjectId,ref:"User"},
	_animal:{type:ObjectId,ref:"Animal"}
},{timestamps:true}));