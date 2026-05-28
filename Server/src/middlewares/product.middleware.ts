import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import {
  ItemCreateSchema,
  ItemEditSchema,
  ItemDeleteSchema,
} from '@/validators/product.validators';

const validateCreateItem = async (
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
  }
};
const validateEditItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedQuery = await ItemEditSchema.parseAsync(req.body);
    Object.assign(req.body, parsedQuery);

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error,
      });
    }
  }
};

const validateDeleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedQuery = await ItemDeleteSchema.parseAsync(req.query);
    Object.assign(req.query, parsedQuery);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error,
      });
    }
  }
};
export { validateCreateItem, validateEditItem, validateDeleteItem };
