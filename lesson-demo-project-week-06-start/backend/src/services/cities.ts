import { pool } from '../db/db';
import type { City, CityCreateRequest } from '../models/cities';

async function fetchAllCities(): Promise<City[]> {
  const response = await pool.query('SELECT * FROM cities;')

  return response.rows
}

async function findCityById(id: number): Promise<City | null> {
  try {
    const response = await pool.query('SELECT * FROM cities WHERE id=$1;', [id])
    
    if(response.rows.length === 0) {
      return null
    }
    return response.rows[0]

  } catch(error) {
    console.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function findCityByCapitalAndCountry(city: CityCreateRequest): Promise<City | null> {
  try {
    const response = await pool.query(
      'SELECT * FROM cities WHERE capital=$1 AND country=$2;', [city.capital, city.country])
    
    if(response.rows.length === 0) {
      return null
    }
    return response.rows[0]

  } catch(error) {
    console.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function insertCity(city: CityCreateRequest): Promise <City> {
  try {
    const { capital, country } = city
    const sql = 'INSERT INTO cities(capital, country) VALUES ($1, $2) RETURNING *;'
    const { rows } = await pool.query(sql,[capital, country])

    return rows[0]

  } catch(error) {
    console.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function deleteCityById(id: number): Promise<number | null> {
  try {
    const response = await pool.query('DELETE FROM cities WHERE id=$1;', [id])
    console.log(response.rows)

    if(response.rowCount === 0) {
      return null
    }

    return id

  } catch(error) {
    console.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

export {
  insertCity,
  deleteCityById,
  fetchAllCities,
  findCityById,
  findCityByCapitalAndCountry
}
