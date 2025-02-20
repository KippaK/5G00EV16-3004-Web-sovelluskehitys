import express, { Request, Response } from 'express';
import { loginUser, signUpUser } from '../controllers/users';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);

export default router 