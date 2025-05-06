import { Request, Response, NextFunction } from 'express';
import { insertCity, deleteCityById, findCityByCapitalAndCountry, fetchAllCities, findCityById, updateCityById } from "../services/cities"
import { cityCreateRequestSchema, cityByIdRequestSchema, cityUpdateRequestSchema } from '../models/cities';

import logger from '../logger';
import { error } from 'console';

const getCities = async (req: Request, res: Response, next: NextFunction) => {
  const data = await fetchAllCities()
  res.json(data);
}

const getCityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedId = cityByIdRequestSchema.parse(req.params.id);
    const data = await findCityById(validatedId);

    if (!data) {
      res.status(404).json( { message: "City not found"})
      return
    }
    res.json(data);

  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occurred: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      logger.error(`Unknown error: ${JSON.stringify(error)}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

const createCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedCity = cityCreateRequestSchema.parse(req.body)

    const exist = await findCityByCapitalAndCountry(validatedCity)
    if (exist) {
      res.status(400).json({ error: "Existing city" })
      return
    }

    const data = await insertCity(validatedCity)

    res.status(200).send(data)

  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occurred: ${error.message}`);
      if ('errors' in error) {
        res.status(400).json({ error: "Missing a required value" })
        return
      }
    }
    logger.error(`Unknown error: ${JSON.stringify(error)}`);
    res.status(500).json( {error: 'Internal server error'})
  }
}

const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedId = cityByIdRequestSchema.parse(req.params.id)
    console.log(validatedId)

    const exist = await findCityById(validatedId)
    if (!exist) {
      res.status(400).json({ error: "City not found" })
      return
    }

    const data = await deleteCityById(validatedId)

    res.status(200).json({ message: "City deleted" })

  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occurred: ${error.message}`);
      if ('errors' in error) {
        res.status(400).json({ error: "Missing a required value" })
        return
      }
    }
    logger.error(`Unknown error: ${JSON.stringify(error)}`);
    res.status(500).json( {error: 'Internal server error'})
  }
}

const updateCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedCity = cityUpdateRequestSchema.parse(req.body)

    const exist = await findCityById(validatedCity.id)
    if (!exist) {
      res.status(400).json({ error: "Trying to update a non existing city" })
      return
    }

    const data = await updateCityById(validatedCity)

    res.status(200).send(data)

  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error occurred: ${error.message}`);
      if ('errors' in error) {
        res.status(400).json({ error: "Missing a required value" })
        return
      }
    }
    logger.error(`Unknown error: ${JSON.stringify(error)}`);
    res.status(500).json( {error: 'Internal server error'})
  }
}

export {
  createCity,
  deleteCity,
  getCities,
  getCityById,
  updateCity
}
