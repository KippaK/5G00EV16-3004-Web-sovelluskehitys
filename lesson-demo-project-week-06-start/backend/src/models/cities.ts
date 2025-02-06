import { z } from 'zod'

/*
export interface City {
  id: number,
  capital: string,
  country: string,
  created: string,
  updated: string,
}
*/

const citySchema = z.object(
  {
    id: z.number(), 
    capital: z.string().min(1, "Name of the capital must be at 1 character"),
    country: z.string().min(1, "Name of the country must be at 1 character"),
    created: z.string(),
    updated: z.string()
  }
)

export type City = z.infer<typeof citySchema>

export const cityCreateRequestSchema = z.object(
  {
    capital: z.string().min(1, "Name of the capital must be at 1 character"),
    country: z.string().min(1, "Name of the country must be at 1 character"),
  }
) 
export type CityCreateRequest = z.infer<typeof cityCreateRequestSchema>

export const cityByIdRequestSchema = z.coerce.number().int().positive();
//export const cityByIdRequestSchema = z.number().int().positive();