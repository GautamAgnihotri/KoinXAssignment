import mongoose from "mongoose";
const connectDB = ()=>{

    try{
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection error : "+error);
        process.exit(1);
    }
    
};


export default connectDB;