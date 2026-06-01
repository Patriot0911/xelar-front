import { z } from 'zod';

export const profileTabSchema = z
  .object({
    displayName: z.string().min(2, 'Min 2 characters').max(32, 'Max 32 characters').or(z.literal('')),
    oldPassword: z.string(),
    newPassword: z.string().min(8, 'Min 8 characters').or(z.literal('')),
  })
  .refine((data) => !data.newPassword || !!data.oldPassword, {
    message: 'Current password is required to set a new one',
    path: ['oldPassword'],
  });

export type TProfileTabForm = z.infer<typeof profileTabSchema>;
