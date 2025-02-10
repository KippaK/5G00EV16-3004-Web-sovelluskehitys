import { Request } from 'express';

//expanding response object on include a custom propery
declare module 'express' {
  export interface Request {
    userData?: { userId: string };
  }
}