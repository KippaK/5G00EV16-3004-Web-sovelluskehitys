import express, { Request, Response } from 'express';
import { createCity, deleteCity, getCities, getCityById } from '../controllers/cities';
import { verifyToken } from '../middleware/middleWare';
import { userInfo } from 'os';


const router = express.Router();

router.get('/', getCities)

router.get('/:id', getCityById)

router.post('/', verifyToken, createCity )

router.delete('/:id', verifyToken, deleteCity )

export default router 

// controller ---> createCity  ---> upsertCity
