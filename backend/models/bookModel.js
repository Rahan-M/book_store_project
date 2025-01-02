import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishYear:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
})

const book = mongoose.model('Book', bookSchema);
export default book