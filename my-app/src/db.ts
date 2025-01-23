import { Pool } from 'pg';

export const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	password: 'cities_password',
	database: 'cities_db',
	port: 5432,
})