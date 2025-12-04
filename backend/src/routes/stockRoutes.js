import express from 'express';
import * as stockCtrl from '../controllers/stockController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create transaction (protected)
router.post('/transactions', authMiddleware, stockCtrl.createTransaction);

// List transactions (optional filtering)
router.get('/transactions', authMiddleware, stockCtrl.listTransactions);

export default router;
