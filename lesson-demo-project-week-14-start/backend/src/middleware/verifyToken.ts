import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { config } from '../config/env';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Default behavior is that an OPTIONS request is sent before all but GET
  if (req.method === 'OPTIONS') {
    next()
    return
  }

  // we will use the headers for our token
  try {

    //check if there is an authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Authentication failed: No token provided.' });
      return
    }

    //check if there is an authorization header format
    const token = authHeader.split(' ')[1]; // Convention is 'Bearer TOKEN'
    if (!token) {
      res.status(401).json({ message: 'Authentication failed: Invalid token format.' });
      return
    }

    // Explicitly define type for decodedToken
    const decodedToken = jwt.verify(token, config.JWT_KEY) as JwtPayload;
    if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.id) {
      res.status(401).json({ message: 'Authentication failed: Invalid token payload.' });
      return
    }
    
    req.userData = { userId: decodedToken.id };

    next();

  } catch (err) {
    res.status(401).send('Authentication failed.');
    return
  }
}
