import express, { Request, Response } from 'express';
import citiesRouter from './routes/cities';

const PORT = 5001

const app = express()

// http://localhost:5001/
app.get('/', (req: Request, res: Response) => {
  res.send('😀😀😀 Hello Backend Developer 😀😀😀')
})

app.use('/api/cities/', citiesRouter);

export default app