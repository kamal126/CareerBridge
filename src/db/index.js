import mongoose from 'mongoose';
import { DB_NAME } from "../constant.js";
const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log(`DB NAME: ${connectionInstance.connection.name}`);
        // console.log(`DB PORT: ${connectionInstance.connection.port}`);
        // console.log(`DB USER: ${connectionInstance.connection.user}`);
        // console.log(`DB STATE: ${connectionInstance.connection.readyState}`);
        // console.log(`DB VERSION: ${connectionInstance.connection.serverConfig.version}`);
        // console.log(`DB CLIENT: ${connectionInstance.connection.client.s.url}`);
    } catch (error) {
        console.error(`\n MONGODB connection FAILED: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
