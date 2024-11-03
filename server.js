import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './src/config/index.js';
import healthRoutes from './src/routes/healthRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors(config.corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Node.js API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.use('/health', healthRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}`);
});