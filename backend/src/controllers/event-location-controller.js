import express from 'express';
import {
  fetchUserLocations,
  fetchLocationById,
  addLocation
} from '../services/event-location-service.js';
import { authenticateToken } from '../middlewares/authentication-middleware.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const data = await fetchUserLocations(req.user.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const location = await fetchLocationById(req.params.id, req.user.id);
    res.status(200).json(location);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const newLocation = await addLocation(req.body, req.user.id);
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
