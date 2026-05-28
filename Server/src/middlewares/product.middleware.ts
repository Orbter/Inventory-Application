import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { ItemCreateSchema } from '@/validators/product.validators';

export const validateCreateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedQuery = await ItemCreateSchema.parseAsync(req.body);
    Object.assign(req.body, parsedQuery);

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error,
      });
    }

    return next(error);
  }
};
