import { z } from 'zod'

const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Min 1 char').max(100, 'Max 100 char'),
    email: z.string().email('Must be valid email'),
    password: z.string(),
    created: z.string(),
    updated: z.string()
})

export const signupUserSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Min 1 char').max(100, 'Max 100 char'),
    email: z.string().email('Must be valid email'),
    password: z.string()
})

export const loginUserSchema = z.object({
    email: z.string().email('Must be valid email'),
    password: z.string()
})

export type User = z.infer<typeof userSchema>

export type UserCreateRequest = z.infer<typeof signupUserSchema>

export type UserLoginRequest = z.infer<typeof loginUserSchema>