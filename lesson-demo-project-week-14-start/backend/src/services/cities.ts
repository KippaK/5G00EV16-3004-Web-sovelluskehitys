import { pool } from '../db/db';
import type { City, CityCreateRequest, CityUpdateRequest } from '../models/cities';

import logger from '../logger';

async function fetchAllCities(): Promise<City[]> {
  try {
    const response = await pool.query('SELECT * FROM cities;')

    return response.rows
  } catch(error) {
    logger.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function findCityById(id: number): Promise<City | null> {
  try {
    const response = await pool.query('SELECT * FROM cities WHERE id=$1;', [id])
    
    if(response.rows.length === 0) {
      return null
    }
    return response.rows[0]

  } catch(error) {
    logger.error('Database query error: ', error)
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
    logger.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function insertCity(city: CityCreateRequest): Promise <City> {
  try {
    const { capital, country, image } = city
    const sql = 'INSERT INTO cities(capital, country, image) VALUES ($1, $2, $3) RETURNING *;'
    const { rows } = await pool.query(sql,[capital, country, image])

    return rows[0]

  } catch(error) {
    logger.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function deleteCityById(id: number): Promise<number | null> {
  try {
    const response = await pool.query('DELETE FROM cities WHERE id=$1;', [id])

    if(response.rowCount === 0) {
      return null
    }

    return id

  } catch(error) {
    logger.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function updateCityById(city: CityUpdateRequest): Promise <City> {
  try {
    const { id, capital, country, image } = city
    const sql = 'UPDATE cities SET capital=$1, country=$2, image=$3 WHERE id=$4 RETURNING *;'
    const { rows } = await pool.query(sql,[capital, country, image, id])

    return rows[0]

  } catch(error) {
    logger.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

export {
  insertCity,
  deleteCityById,
  fetchAllCities,
  findCityById,
  findCityByCapitalAndCountry,
  updateCityById
}
