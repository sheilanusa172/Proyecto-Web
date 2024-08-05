import { Router } from 'express';
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';
import {authorizeRoles} from '../middlewares/authorizeRoles.js';
const router = Router();

router.get('/products', authRequired,authorizeRoles('admin'), getProducts);
router.post('/products', authRequired,authorizeRoles('admin'), createProduct);
router.get('/products/:id', authRequired, getProduct);
router.put('/products/:id', authRequired,authorizeRoles('admin'), updateProduct);
router.delete('/products/:id', authRequired,authorizeRoles('admin'), deleteProduct);

export default router;

