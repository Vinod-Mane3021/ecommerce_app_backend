import express from 'express';
import { REQUEST_DATA_LIMIT } from './constants/constants';

const app = express();

// set the limit for request data coming from client
app.use(express.json({ limit: REQUEST_DATA_LIMIT }))




import mainRouter from './routes/index.routes';

app.use("/api/v1", mainRouter());

export default app;