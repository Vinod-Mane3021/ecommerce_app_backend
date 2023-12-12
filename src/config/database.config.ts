import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants";

/**
 * Connecting to the MongoDB database using Mongoose.
 * @returns - A Promise representing the Mongoose connection.
 * @throws {Error} Throws an error if there is an issue connecting to the database.
 */
const connectDB = async () => {
    try {
        // Extract the MongoDB connection URL from the environment variables.
        const MONGODB_URI = process.env.MONGODB_URI;        
        // Attempt to connect to the database using Mongoose.
        const response = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        if (response.connection.readyState === 1) {
            console.log(`✔️  MongoDB connected successfully | DB_NAME: ${response.connection.name} | HOST: ${response.connection.host} | MONGODB_URL: ${MONGODB_URI}`);
        }
        return response;
    } catch (error) {
        // Log an error message and throw the error if there is an issue connecting to the database.
      console.error("Got error while connecting to database : ", error);
      throw error;
    }
}

export { connectDB }