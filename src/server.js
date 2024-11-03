import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/index.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors(config.corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/', routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}`);
});