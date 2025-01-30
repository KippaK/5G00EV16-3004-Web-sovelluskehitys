import express, { Request, Response } from 'express';
import { getCities, getCityById } from '../controllers/cities';

const router = express.Router();

// http://localhost:5001/api/cities
router.get('/', getCities)

// http://localhost:5001/api/cities/1
router.get('/:id', getCityById)

export default router

