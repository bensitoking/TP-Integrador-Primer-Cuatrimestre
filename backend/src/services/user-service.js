import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser } from '../repositories/user-repository.js';
import { isEmailValid, isShortText } from '../helpers/validations-helper.js';

export const register = async (body) => {
  const { first_name, last_name, username, password } = body;

  if (isShortText(first_name) || isShortText(last_name)) throw new Error('Nombre o apellido inválido');
  if (!isEmailValid(username)) throw new Error('Email inválido');
  if (isShortText(password)) throw new Error('Contraseña inválida');

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ first_name, last_name, username, password: hashedPassword });
};

export const login = async (body) => {
  const { username, password } = body;

  if (!isEmailValid(username)) throw new Error('Email inválido');

  const user = await findUserByUsername(username);
  if (!user) throw new Error('Usuario o clave inválida');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Usuario o clave inválida');

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
