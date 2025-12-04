import express from 'express';
import * as productCtrl from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public list and get
router.get('/', productCtrl.listProducts);
router.get('/:id', productCtrl.getProduct);

// Protected create/update/delete
router.post('/', authMiddleware, productCtrl.createProduct);
router.put('/:id', authMiddleware, productCtrl.updateProduct);
router.delete('/:id', authMiddleware, productCtrl.deleteProduct);

export default router;
