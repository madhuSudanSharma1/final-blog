import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import appRouter from './routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

// Clerk imports
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

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

// Clerk middleware: attaches req.auth to all requests
app.use(ClerkExpressWithAuth());


app.use(info_logger_middleware)


app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.get("/health", (req, res) => {
  res.send("OK from port 3000")
})

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
