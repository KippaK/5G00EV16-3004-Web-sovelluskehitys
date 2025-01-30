import { Request, Response, NextFunction } from 'express';
import { fetchAllCities, findCityById, insertCity } from "../services/cities"
import { rmSync } from 'fs';
import { cityCreateRequestSchema } from '../models/cities';

const getCities = async (req: Request, res: Response, next: NextFunction) => {
	const data = await fetchAllCities()
	res.json(data);
}

const getCityById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = parseInt(req.params.id)
		const data = await findCityById(id);
		if (!data) {
			res.status(404).json({ message: "City not found" })
			return
		}
		res.json(data);
		return
	} catch(error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

const createCity = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validatedCity = cityCreateRequestSchema.parse(req.body)
		const data = await insertCity(validatedCity)
		res.status(200).send(data)
	} catch (error) {
		if (error instanceof Error) {
			if ('errors' in error) {
				res.status(400).json({ error: "Missing a required value" })
				return
			}
		}
		res.status(500).json({ error: 'Internal server error' })
	}
}

export {
	getCities,
	getCityById,
	createCity
}
