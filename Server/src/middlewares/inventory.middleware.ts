import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { InventorySearchQuerySchema } from '@/validators/inventory.validators';

const validateInventory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedQuery = await InventorySearchQuerySchema.parseAsync(req.query);
    Object.assign(req.query, parsedQuery);

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }
    return next(error);
  }
};
export { validateInventory };
