import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { loginUserRequestSchema, signUpUserRequestSchema, UserCreateRequest } from '../models/users';
import { config } from '../config/env';
import { createUser, findByEmail } from '../services/users';
import logger from '../logger';

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const validUserSignUpData = signUpUserRequestSchema.parse(req.body) 


    const exist = await findByEmail(validUserSignUpData.email);
    if (exist) {
      res.status(422).send('Could not create user, user exist');
      return
    }
  
    let hashedPassword;
    try {
      // Parameters, the string to hash, salt length to generate or salt to use
      hashedPassword = await bcrypt.hash(validUserSignUpData.password, 12);
    } catch (err) {
      res.status(500).send('Could not create user, try again');
      return
    }

    const newUser: UserCreateRequest  = {
      id: v4(),
      name: validUserSignUpData.name,
      email: validUserSignUpData.email,
      password: hashedPassword
    }

    try {
      const result = await createUser(newUser);
      if (!result) {
        res.status(500).send('Something went wrong creating the user');
        return
      }

      const token = jwt.sign(
        {
          id: newUser.id,      // payload, anything that make sense and
          email: newUser.email // what you might need on the frontend
        },
        config.JWT_KEY,     // secret key
        { expiresIn: '1h' } // options like an experation time
      );
      
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        token: token
      })
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error occurred: ${error.message}`);
      }

      res.status(500).send('Signup failed, please try again');
     return
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occurred: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      logger.error(`Unknown error: ${JSON.stringify(error)}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const validUserLoginData = loginUserRequestSchema.parse(req.body)

    // Check if the user is in the system
    let identifiedUser;
    try {
      const data = await findByEmail(validUserLoginData.email);
      if (!data) {
        res.status(401).send('Could not identify user, credetials might be wrong');
        return
      }
      identifiedUser = data;

    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error occurred: ${error.message}`);
      }
      res.status(500).send('Something went wrong with login in the user');
      return
    }

    // Check if the user is knows the correct password
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(validUserLoginData.password, identifiedUser.password);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error occurred: ${error.message}`);
      }
      res.status(500).send('Could not log you in , check your credetials');
      return
    }

    if (!isValidPassword) {
      res.status(401).send('Could not identify user, credetials might be wrong');
      return
    }

    // Create the token
    let token
    try {
      token = jwt.sign(
        {
          id: identifiedUser.id, // payload, anything that make sense and
          email: identifiedUser.email // what you might need on the frontend
        },
      config.JWT_KEY, // secret key
        { expiresIn: '1h' } // options like an experation time
      )
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error occurred: ${error.message}`);
      }
      res.status(500).send('Something went wrong with login in the user');
      return
    }

    // Send back the token
    res.status(201).json({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token: token
    })
  }  catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occurred: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      logger.error(`Unknown error: ${JSON.stringify(error)}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export {
  signUpUser,
  loginUser
}