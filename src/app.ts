import express from 'express';
import { REQUEST_DATA_LIMIT } from './constants';
import cors from 'cors'
import { Keys } from './config/keys';
import cookieParser from 'cookie-parser'

const app = express();

// cors configuration
app.use(cors({
    origin: Keys.cors,
    credentials: true
}))

// set the limit for request data coming from client
app.use(express.json({ limit: REQUEST_DATA_LIMIT }))
app.use(express.urlencoded({ extended: true, limit: REQUEST_DATA_LIMIT }));
app.use(express.static('public'))
app.use(cookieParser())



import router from './routes/index.routes';

app.use("/api/v1", router);

export default app;