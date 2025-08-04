import {
  getEnrollment,
  addEnrollment,
  deleteEnrollment,
  getEnrollmentsByEvent,
} from '../repositories/enrollment-repository.js';

import { getEventById } from '../repositories/event-repository.js';

export const enrollUser = async (eventId, userId) => {
  const event = await getEventById(eventId);
  if (!event) throw new Error('Evento no encontrado');
  if (!event.enabled_for_enrollment) throw new Error('Evento no habilitado para inscripción');

  const eventDate = new Date(event.start_date);
  const today = new Date();
  if (eventDate <= today) throw new Error('No se puede registrar en un evento ya ocurrido');

  const existing = await getEnrollment(eventId, userId);
  if (existing) throw new Error('Ya estás registrado en este evento');

  const { data } = await getEnrollmentsByEvent(eventId);
  if (data && data.length >= event.max_assistance) {
    throw new Error('Capacidad máxima alcanzada');
  }

  return await addEnrollment({
    id_event: eventId,
    id_user: userId,
    registration_date_time: new Date().toISOString()
  });
};

export const unenrollUser = async (eventId, userId) => {
  const event = await getEventById(eventId);
  if (!event) throw new Error('Evento no encontrado');

  const eventDate = new Date(event.start_date);
  const today = new Date();
  if (eventDate <= today) throw new Error('No se puede eliminar registro de evento pasado');

  const existing = await getEnrollment(eventId, userId);
  if (!existing) throw new Error('No estás registrado en este evento');

  return await deleteEnrollment(eventId, userId);
};
