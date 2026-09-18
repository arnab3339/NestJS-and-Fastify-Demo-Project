import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
});

export class LoginDto implements z.infer<typeof loginSchema> {
    email: string;
    password: string;
}