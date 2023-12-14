import express from 'express';
import { REQUEST_DATA_LIMIT } from './constants';

const app = express();

// set the limit for request data coming from client
app.use(express.json({ limit: REQUEST_DATA_LIMIT }))




import router from './routes/index.routes';

app.use("/api/v1", router);

export default app;