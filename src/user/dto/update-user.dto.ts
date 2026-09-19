import { z } from 'zod';

export const updateUserSchema = z.object({
    fullName: z.string().min(1).optional(),
    phone: z.string().min(10).max(15).optional(),
    isActive: z.boolean().optional(),
    mustChangePassword: z.boolean().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;