import express from 'express';
import {
  fetchEvents,
  fetchEventById,
  addEvent,
  editEvent,
  removeEvent,
} from '../services/event-service.js';
import { authenticateToken } from '../middlewares/authentication-middleware.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const events = await fetchEvents();
    res.json(events); // ← Ahora devuelve solo el array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await fetchEventById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento no encontrado' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const newEvent = await addEvent(req.body, req.user.id);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/', authenticateToken, async (req, res) => {
  try {
    const updated = await editEvent(req.body, req.user.id);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await removeEvent(req.params.id, req.user.id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
