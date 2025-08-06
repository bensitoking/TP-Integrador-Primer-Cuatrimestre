import express from 'express';
import {
  enrollUser,
  unenrollUser
} from '../services/enrollment-service.js';
import { authenticateToken } from '../middlewares/authentication-middleware.js';

const router = express.Router();

router.post('/:id/enrollment', authenticateToken, async (req, res) => {
  try {
    const enrolled = await enrollUser(req.params.id, req.user.id);
    res.status(201).json(enrolled);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id/enrollment', authenticateToken, async (req, res) => {
  try {
    const result = await unenrollUser(req.params.id, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
