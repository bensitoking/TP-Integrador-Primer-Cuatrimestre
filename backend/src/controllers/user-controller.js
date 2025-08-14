import express from 'express';
import { register, login } from '../services/user-service.js';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body);
    return res.status(201).json({ success: true, message: 'Usuario registrado con éxito', user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body);
    return res.status(200).json({ success: true, message: 'Login exitoso', token });
  } catch (err) {
    const mensaje = err.message || '';
    if (mensaje.includes('Usuario o clave inválida')) {
      return res.status(401).json({ success: false, message: 'Usuario o clave inválida', token: '' });
    }
    console.error('Error en login:', err);
    return res.status(500).json({ success: false, message: 'Error interno del servidor', token: '' });
  }
});

export default router;
