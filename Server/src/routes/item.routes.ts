// server/src/routes/item.routes.ts
import express from 'express';
import { handleSummary, createItem } from '@/controllers/item.controller';
import { handleCategories } from '@/controllers/categories.controller';
import { handleInventory } from '@/controllers/inventory.controller';
import { validateInventory } from '@/middlewares/inventory.middleware';
import {
  validateCreateItem,
  validateEditItem,
  validateDeleteItem,
} from '@/middlewares/product.middleware';

const router = express.Router();

router.get('/summary', handleSummary);
router.get('/inventory', validateInventory, handleInventory);
router.get('/categories', handleCategories);
router.post('/item', validateCreateItem, createItem);
router.post('/item/edit', validateEditItem, createItem);
router.delete('/item/delete/:id', validateDeleteItem, createItem);

export default router;
