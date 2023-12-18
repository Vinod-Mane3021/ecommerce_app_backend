import { connectDB } from "./config/database.config";
import app from "./app";
import { Keys } from "./config/keys";
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(Keys.port, () => {
        console.log(`⚙️  Server is running at port : ${Keys.port}`);
    })
    app.on('error', (error) => {
        console.error("Error : ", error);
        throw error
    })
})  
.catch((error) => {
    console.error("MONGO db connection failed! ", error);
    throw error;
})