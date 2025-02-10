import { pool } from '../db/db';
import { User, UserCreateRequest } from '../models/users';

async function createUser(user: UserCreateRequest): Promise <User> {
  try {
    const { id, name, email, password } = user
    const sql = 'INSERT INTO users(id, name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *;'
    const { rows } = await pool.query(sql,[ id, name, email, password ])

    return rows[0]

  } catch(error) {
    console.error('Database query error: ', error)
    throw new Error('Database query failed')
  }
}

async function findUserByEmail(email: string): Promise<User | null> {
    try {
        const { rows } = await pool.query(
            'SELECT id, name, email, password_hash as password, created, updated FROM users WHERE email=$1;', [email]
        )
        if (rows.length === 0) {
            return null
        }
        return rows[0]
    } catch (error) {
        console.error('Database query error', error)
        throw new Error('Database query Error')
    }    
}

export { createUser, findUserByEmail };