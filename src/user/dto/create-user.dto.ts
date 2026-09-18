import { z } from 'zod';

export const createUserSchema = z.object({
    fullName: z
        .string()
        .min(1, 'fullName is required')
        .max(150, 'fullName must not exceed 150 characters'),

    email: z.email('Invalid email'),

    phone: z
        .string()
        .min(10, 'Phone number should be in 10 digits')
        .max(10, 'Phone number should be in 10 digits'),

    password: z
        .string()
        .min(8, 'password must be at least 8 characters')
        .max(72, 'password must not exceed 72 characters')
        .regex(/[a-z]/, 'password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'password must contain at least one number')
        .regex(
            /[^a-zA-Z0-9]/,
            'password must contain at least one special character',
        ),
});

export class CreateUserDto implements z.infer<typeof createUserSchema> {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}