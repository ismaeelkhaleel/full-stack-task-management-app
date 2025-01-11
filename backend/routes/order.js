import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { getUserOrders, placeOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/placeOrder', authenticateUser, placeOrder);
router.get('/myOrders', authenticateUser, getUserOrders);

export default router;