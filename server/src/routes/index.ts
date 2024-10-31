import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Use authentication routes
router.use('/auth', authRoutes);

// Add authentication to the API routes
router.use('/api', authenticateToken, apiRoutes); // Apply the middleware here

export default router;
