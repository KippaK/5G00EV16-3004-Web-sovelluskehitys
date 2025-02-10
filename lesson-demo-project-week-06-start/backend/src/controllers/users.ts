import { Request, Response, NextFunction, raw } from 'express';
import { UserCreateRequest, signupUserSchema, loginUserSchema } from '../models/users';
import { createUser, findUserByEmail } from '../services/users';
import * as bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { equal } from 'assert';

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("log")
    const validatedUserData = signupUserSchema.parse(req.body)

    console.log("log")
    const exists = await findUserByEmail(validatedUserData.email)

    console.log("log")
    if (exists) {
        res.status(400).json({ message: 'User exists' })
        return
    }

    console.log("log")
    let hashedPassword;    
    try {
        hashedPassword = await bcrypt.hash(validatedUserData.password, 12);
    } catch (error) {
        res.status(500).json({ message: 'Could not create user, try again' })
    }
    console.log("log")
    const newUser: UserCreateRequest = {
        id: v4(),
        name: validatedUserData.name,
        email: validatedUserData.email,
        password: hashedPassword!
    }

    console.log("log")
    try {
        const userData = await createUser(newUser)

        console.log("log")
        if (!userData) {
            res.status(500).json({ message: 'Could not create user, try again' })
        }

        console.log("log")
        const token = jwt.sign(
            {
                id: userData.id,
                email: userData.email
            },
            config.JWT_KEY,
            {
                expiresIn: '1h'
            }

        )

        console.log("log")
        res.status(201).json({
            id: userData.id,
            token
        })
        console.log("log")
    } catch (error) {
        res.status(500).json({ message: 'Could not create user, try again' })
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedUserData = loginUserSchema.parse(req.body)
        const user = await findUserByEmail(validatedUserData.email)
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' })
            return
        }

        const validPassword = await bcrypt.compare(validatedUserData.password, user.password)
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid credentials' })
            return
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            config.JWT_KEY,
            {
                expiresIn: '1h'
            }

        )

        res.status(200).json({
            id: user.id,
            token
        })

    } catch (error) {
        if (error instanceof Error) {
            if ('errors' in error) {
                res.status(400).json([{ error: 'Missing a required value' }])
                return
            }
        }
        res.status(500).json({ error: 'Internal server error' })
    }
}

export {
    signUpUser,
    loginUser
}