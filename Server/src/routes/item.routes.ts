// server/src/routes/item.routes.ts
import express from 'express';
import { handleSummary } from '@/controllers/item.controller';
import { handleCategories } from '@/controllers/categories.controller';
import {
  handleInventory,
  handleSearch,
} from '@/controllers/inventory.controller';
import { validateInventory } from '@/middlewares/inventory.middleware';
const router = express.Router();

router.get('/summary', handleSummary);
router.get('/inventory', validateInventory, handleInventory);
router.get('/inventory/search', validateInventory, handleSearch);
router.get('/categories', handleCategories);

export default router;
