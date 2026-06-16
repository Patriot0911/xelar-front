import { ALL_PERMISSIONS } from '@/lib/constants/permissions';
import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  rolePriority: z.coerce.number().min(0).max(256).optional(),
  permissions: z.array(z.enum(ALL_PERMISSIONS)),
});

export type TCreateRoleForm = z.infer<typeof createRoleSchema>;
