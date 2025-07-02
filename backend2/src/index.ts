import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';


import appRouter from './routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

import { info_logger_middleware } from './middlewares/logger_middleware';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
));

app.use(info_logger_middleware)

app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/api/blogs/health", (req, res) => {
    res.status(200).send(`OK from port ${process.env.NODE_ENV}`)
  })


app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
