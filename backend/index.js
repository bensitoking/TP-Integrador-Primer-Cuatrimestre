
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/controllers/user-controller.js';
import eventRoutes from './src/controllers/event-controller.js';
import locationRoutes from './src/controllers/event-location-controller.js';
import enrollmentRoutes from './src/controllers/enrollment-controller.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/event-location', locationRoutes);
app.use('/api/event', enrollmentRoutes);

app.get('/', (req, res) => res.send('API Events - up'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
