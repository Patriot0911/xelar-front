import { z } from 'zod';
import { USER_BALANCE_MAX } from '@/lib/constants/users';

export const userBalanceSchema = z.object({
  balance: z
    .string()
    .trim()
    .min(1, 'Enter a balance')
    .transform(Number)
    .pipe(
      z
        .number({ error: 'Must be a number' })
        .min(0, 'Cannot be negative')
        .max(USER_BALANCE_MAX, `Cannot exceed ${USER_BALANCE_MAX}`),
    ),
});

export type TUserBalanceForm = z.input<typeof userBalanceSchema>;
export type TUserBalanceValues = z.output<typeof userBalanceSchema>;
