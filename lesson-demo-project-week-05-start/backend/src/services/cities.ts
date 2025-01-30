import { pool } from '../db/db';
import { City, CityCreateRequest } from '../models/cities'

async function fetchAllCities(): Promise<City[]> {
	const response = await pool.query('SELECT * FROM cities;')
	return response.rows
}

async function findCityById(id: number): Promise<City | null> {
	try {
		const response = await pool.query('SELECT * FROM cities WHERE id=$1;', [id])
		if (response.rows.length === 0) { 
			return null
		}
		return response.rows[0]
	} catch(error) {
		console.error('Database query error');
		throw new Error('Database query failed');
	};
}

async function insertCity(city: CityCreateRequest): Promise<City | null> {
	try {
		const { capital, country } = city
		const sql = 'INSERT INTO cities(capital, country) VALUES ($1, $2) RETURNING *;'
		const { rows } = await pool.query(sql, [ capital, country ]);
		if (rows.length === 0) { 
			return null
		}
		return rows[0]
	} catch(error) {
		console.error('Database query error');
		throw new Error('Database query failed');
	}
}

export {
	fetchAllCities,
	findCityById,
	insertCity
}
