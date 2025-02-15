import { z } from 'zod';

const passwordUpperCase = /[A-Z]/;
const passwordNumber = /[0-9]/;
const passwordSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

export const countrySchema = z.object({
  countryName: z.string().min(1),
  city: z.string().min(1),
});

export const userSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().min(1),
  password: z
    .string()
    .min(8)
    .regex(
      passwordUpperCase,
      'Password must contain at least one uppercase letter',
    )
    .regex(passwordNumber, 'Password must contain at least one number')
    .regex(
      passwordSpecialChar,
      'Password must contain at least one special character',
    ),
});

export const validateUser = (userData: unknown) =>
  userSchema.safeParse(userData);
