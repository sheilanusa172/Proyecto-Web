import express from 'express';
import { addPayment, getPayments, deletePayment, getPaymentsByUserId } from '../controllers/payments.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';
import {authorizeRoles} from '../middlewares/authorizeRoles.js';
const router = express.Router();

router.post('/', authRequired,authorizeRoles('admin'), addPayment);
router.get('/', authRequired, getPayments);
router.delete('/:id', authRequired,authorizeRoles('admin'), deletePayment);
router.get('/user/:userId', authRequired, getPaymentsByUserId);

export default router;
