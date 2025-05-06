import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import logger from './logger';

import citiesRouter from './routes/cities';
import usersRouter from './routes/users';

const app = express()


app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.static('public')) 
app.use(express.json())

// http://localhost:5001/
app.get('/', (req: Request, res: Response) => {
  res.send('😀😀😀 Hello Backend Developer 😀😀😀')
})

app.use('/api/cities/', citiesRouter);

app.use('/api/users', usersRouter);

export default app