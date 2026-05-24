// server/src/routes/item.routes.ts
import express from 'express';
import { handleSummary } from '@/controllers/item.controller';

const router = express.Router();

router.get('/summary', handleSummary);

export default router;
