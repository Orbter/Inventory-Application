// server/src/routes/item.routes.ts
import express from 'express';
import { handleSummary } from '@/controllers/item.controller';
import {
  handleInventory,
  handleSearch,
} from '@/controllers/inventory.controller';
import { validateInventory } from '@/middlewares/Inventory.middleware';
const router = express.Router();

router.get('/summary', handleSummary);
router.get('/inventory', handleInventory);
router.get('/inventory/search', validateInventory, handleSearch);

export default router;
