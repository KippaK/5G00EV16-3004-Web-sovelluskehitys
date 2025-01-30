import { Request, Response, NextFunction } from 'express';
import { fetchAllCities, findCityById } from "../services/cities"

const getCities = async (req: Request, res: Response, next: NextFunction) => {
  const data = await fetchAllCities()
  res.json(data);
}

const getCityById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id)
  const data = await findCityById(id);
  res.json(data);
}

export {
  getCities,
  getCityById
}
