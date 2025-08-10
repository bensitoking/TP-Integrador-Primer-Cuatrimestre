
import express from 'express';
import { register, login } from '../services/user-service.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body);
    return res.status(201).json({ success: true, message: '', user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body);
    return res.status(200).json({ success: true, message: '', token });
  } catch (err) {
    const msg = err.message || 'Error';
    if (msg.toLowerCase().includes('username inválido')) {
      return res.status(400).json({ success: false, message: 'El username es invalido.', token: '' });
    }
    return res.status(401).json({ success: false, message: 'Usuario o clave inválida.', token: '' });
  }
});

export default router;
