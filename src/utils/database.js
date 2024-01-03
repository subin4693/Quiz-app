import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected...");
    } catch (error) {
        console.log("Error occured while connecting");
        console.log(error);
    }
};
export default connect;
