import mongoose from "mongoose";
const conncectDB=()=>{
    return mongoose.connect(process.env.MONGO_URI)
}
export default conncectDB;