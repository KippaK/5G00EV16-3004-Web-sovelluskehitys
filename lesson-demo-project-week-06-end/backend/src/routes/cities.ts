import express, { Request, Response } from 'express';
import { createCity, deleteCity, getCities, getCityById } from '../controllers/cities';

import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

// http://localhost:5001/api/cities
router.get('/', getCities)

// http://localhost:5001/api/cities/1
router.get('/:id', getCityById)

// You can apply the middleware to protect routes.
router.post('/', verifyToken, createCity )
router.delete('/:id', verifyToken, deleteCity )

export default router 

// controller ---> createCity  ---> upsertCity
