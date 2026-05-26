// server/src/validators/inventory.validators.ts
import { z } from 'zod';

export const InventorySearchQuerySchema = z.object({
  query: z.string().trim().max(100, 'Search query is too long'),
  page: z
    .string()
    .optional()
    .transform((val) => {
      const parsed = parseInt(val || '1', 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    }),
});
