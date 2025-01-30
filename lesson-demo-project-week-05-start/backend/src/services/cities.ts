import { pool } from '../db/db';

async function fetchAllCities() {
  const response = await pool.query('SELECT * FROM cities;')
  console.log(response.rows)
  return response.rows
}

async function findCityById(id: number) {
  const response = await pool.query('SELECT * FROM cities WHERE id=$1;', [id])
  console.log(response.rows)
  return response.rows
}

export {
  fetchAllCities,
  findCityById
}
