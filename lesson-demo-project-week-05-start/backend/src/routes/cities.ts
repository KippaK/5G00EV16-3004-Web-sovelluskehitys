import express, { Request, Response } from 'express';
import { getCities, getCityById, createCity } from '../controllers/cities';
import { create } from 'domain';

const router = express.Router();

// http://localhost:5001/api/cities
router.get('/', getCities)

// http://localhost:5001/api/cities/1
router.get('/:id', getCityById)

router.post('/', createCity)

export default router

