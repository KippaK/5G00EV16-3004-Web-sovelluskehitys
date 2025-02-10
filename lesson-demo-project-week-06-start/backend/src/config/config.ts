import dotenv from 'dotenv'

dotenv.config()

interface Config {
    DB_USER: string,
    DB_HOST: string,
    DB_PASSWORD: string,
    DB_DATABASE: string,
    DB_PORT: number,
    APP_PORT: number,
    JWT_KEY: string
}

export const config: Config = {
    DB_USER: process.env.DB_USER || 'postgres',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PASSWORD: process.env.DB_PASSWORD || 'cities_password',
    DB_DATABASE: process.env.DB_DATABASE || 'cities_db',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    APP_PORT: Number(process.env.APP_PORT) || 5001,
    JWT_KEY: process.env.JWT_KEY || 'my_jwt_key'
}