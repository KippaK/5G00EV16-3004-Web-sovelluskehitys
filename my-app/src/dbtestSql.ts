import { pool } from './db';

interface City {
    id?: number,
    capital: string,
    country: string
}

async function fetchCities() {
    try {
        const response = await pool.query('SELECT * FROM cities;');
        console.log(response.rows);
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

async function fetchCitiesName(name: string) {
    try {
        const response = await pool.query('SELECT * FROM cities WHERE capital=$1;', [name]);
        console.log(response.rows);
    } catch (error) {
        console.error('Error fetching city by name:', error);
    }
}

const newCity: City = {
    capital: "Gabarone",
    country: "Botswana"
}

async function addCity(city: City) {
    const sql = 'INSERT INTO cities(capital, country) VALUES($1, $2) RETURNING *;'
    const values = [city.capital, city.country]
    const response = await pool.query(sql, values)
    console.log(response)
}

fetchCities();
fetchCitiesName('Pretoria');
addCity(newCity)