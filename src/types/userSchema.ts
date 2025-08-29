import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
  password: z
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export type User = z.infer<typeof userSchema>;
export type UserWithoutPassword = Omit<User, 'password'>;
