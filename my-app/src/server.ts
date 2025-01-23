import { Request, Response } from "express";
import { allowedNodeEnvironmentFlags } from "process";

const express = require('express');

const PORT = 5001
const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Backend Developer')
})

app.get('/api/cities', (req: Request, res: Response) => {
    res.json(['Oslo', 'Paris', 'Tampere'])
})

app.listen(PORT, () => {
    console.log(`Backend API is running on PORT ${PORT}`)

})