import { Cipher } from 'crypto'
import { string, z } from 'zod'

/*
export interface City {
    id: number,
    capital: string,
    country: string,
    created: string,
    updated: string
}
*/

const citySchema = z.object(
    {
        id: z.number(),
        capital: z.string().min(1, "Name of the capital must be at least 1 character"),
        country: z.string().min(1, "Name of the country must be at least 1 character"),
        created: z.string(),
        updated: z.string()
    }
)

export const cityCreateRequestSchema = z.object(
    {
        capital: z.string().min(1, "Name of the capital must be at least 1 character"),
        country: z.string().min(1, "Name of the country must be at least 1 character")
    }
)


export type City = z.infer<typeof citySchema>
export type CityCreateRequest = z.infer<typeof cityCreateRequestSchema>