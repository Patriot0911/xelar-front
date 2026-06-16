import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  displayName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignInForm = z.infer<typeof signInSchema>;
export type TSignUpForm = z.infer<typeof signUpSchema>;
