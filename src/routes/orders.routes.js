import express from 'express';
import { getOrders, createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/order.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';
import {authorizeRoles} from '../middlewares/authorizeRoles.js';
const router = express.Router();

router.get('/orders',authRequired, getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders',authRequired,authorizeRoles('admin'), createOrder);
router.put('/orders/:id',authRequired,authorizeRoles('admin'), updateOrder);
router.delete('/orders/:id',authRequired,authorizeRoles('admin'), deleteOrder);

export default router;
