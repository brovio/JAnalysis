import express from 'express';
import statusRoutes from './statusRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js API' });
});

router.use('/api/status', statusRoutes);

export default router;