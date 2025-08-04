import express from 'express';
import { register, login } from '../services/user-service.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ success: true, message: '', token });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message, token: '' });
  }
});

export default router;
