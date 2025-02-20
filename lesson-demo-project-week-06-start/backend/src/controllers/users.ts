import { Request, Response, NextFunction, raw } from 'express';
import { UserCreateRequest, signupUserSchema, loginUserSchema } from '../models/users';
import { createUser, findUserByEmail } from '../services/users';
import * as bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { equal } from 'assert';

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    const validatedUserData = signupUserSchema.parse(req.body)

    const exists = await findUserByEmail(validatedUserData.email)

    if (exists) {
        res.status(400).json({ message: 'User exists' })
        return
    }

    let hashedPassword;    
    try {
        hashedPassword = await bcrypt.hash(validatedUserData.password, 12);
    } catch (error) {
        res.status(500).json({ message: 'Could not create user, try again' })
    }
    const newUser: UserCreateRequest = {
        id: v4(),
        name: validatedUserData.name,
        email: validatedUserData.email,
        password: hashedPassword!
    }

    try {
        const userData = await createUser(newUser)

        if (!userData) {
            res.status(500).json({ message: 'Could not create user, try again' })
        }

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

        res.status(201).json({
            id: userData.id,
            token
        })
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

        res.status(201).json({
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