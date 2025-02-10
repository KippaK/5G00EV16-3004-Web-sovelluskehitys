import express from "express";
import { signUpUser, loginUser } from "../controllers/users";

const router = express.Router()

router.post('/singup', signUpUser);
router.post('/login', loginUser)

export default router