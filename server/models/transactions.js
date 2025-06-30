const mongoose=require('mongoose');
const customers = require('./customers');

const transactinSchema=mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:['Income','Expense'],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    description:{
        type:String,
        default:'N/A'
    }
},{timestamps:true});

module.exports= mongoose.model('transaction',transactinSchema);