import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser } from '../repositories/user-repository.js';
import { isUsernameValid, isShortText } from '../helpers/validations-helper.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (body) => {
  const { first_name, last_name, username, password } = body;

  if (isShortText(first_name) || isShortText(last_name)) throw new Error('Nombre o apellido inválido');
  if (!isUsernameValid(username)) throw new Error('Username inválido');
  if (isShortText(password)) throw new Error('Contraseña inválida');

  const existing = await findUserByUsername(username);
  if (existing) throw new Error('El username ya existe');

  const hashedPassword = await bcrypt.hash(password, 10);
  const created = await createUser({ first_name, last_name, username, password: hashedPassword });
  if (created && created.password) delete created.password;
  return created;
};

export const login = async (body) => {
  const { username, password } = body || {};

  if (!isUsernameValid(username)) throw new Error('Usuario o clave inválida');

  const user = await findUserByUsername(username);
  if (!user || !user.password) throw new Error('Usuario o clave inválida');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Usuario o clave inválida');

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET no definido');
    throw new Error('Error en el servidor');
  }

  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
