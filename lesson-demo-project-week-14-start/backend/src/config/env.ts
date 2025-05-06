import dotenv from 'dotenv';

dotenv.config();

interface Config {
  APP_PORT: number;
  DB_USER: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  JWT_KEY: string;
}

export const config: Config = {
  APP_PORT: Number(process.env.PORT) || 5001,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'cities_db',
  DB_PASSWORD: process.env.DB_PASSWORD || 'cities_password',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  JWT_KEY: process.env.JWT_KEY || 'my_super_secret_jwt_key',
};