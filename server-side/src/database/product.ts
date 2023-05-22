import mongoose from 'mongoose'
import {Decimal128} from 'mongodb'

const productSchema = new mongoose.Schema({
  id:{
		type:Number,
		required:true
	},
	title:{
		type: String,
		required:	true
	},
	description:{
		type:String,
		required: true
	},
	  price:{
		type:Number,
		required:true
	},
	discountPercentage:{
		type: Number,
		required:	true
	},
	rating:{
		type:Number,
		required: true
	},
	  stock:{
		type:Number,
		required:true
	},
	brand:{
		type: String,
		required:	true
	},
	category:{
		type:String,
		required: true
	},
		thumbnail:{
		type:String,
		required: true
	}
});

export const Product = mongoose.model('product', productSchema);
