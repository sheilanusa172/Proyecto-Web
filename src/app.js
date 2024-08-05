import express from 'express';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import productRoutes from "./routes/products.routes.js";
import paymentsRoutes from './routes/payments.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import orderRoutes from './routes/orders.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", productRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api', commentsRoutes);
app.use('/api', orderRoutes);
app.use('/api/users', userRoutes);

export default app;