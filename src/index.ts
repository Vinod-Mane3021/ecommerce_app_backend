import { connectDB } from "./config/database.config";
import app from "./app";

const PORT = process.env.PORT || 3000;
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️  Server is running at port : ${PORT}`);
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