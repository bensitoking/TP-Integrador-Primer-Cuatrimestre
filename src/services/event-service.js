import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../repositories/event-repository.js';

import { isShortText, isPositiveNumber } from '../helpers/validations-helper.js';

export const fetchEvents = async () => {
  return await getAllEvents();
};

export const fetchEventById = async (id) => {
  return await getEventById(id);
};

export const addEvent = async (event, userId) => {
  const {
    name,
    description,
    id_event_location,
    start_date,
    duration_in_minutes,
    price,
    enabled_for_enrollment,
    max_assistance,
  } = event;

  if (isShortText(name) || isShortText(description)) {
    throw new Error('El nombre o descripción son inválidos.');
  }

  if (!isPositiveNumber(price) || !isPositiveNumber(duration_in_minutes)) {
    throw new Error('El precio o duración son inválidos.');
  }

  return await createEvent({
    name,
    description,
    id_event_location,
    start_date,
    duration_in_minutes,
    price,
    enabled_for_enrollment,
    max_assistance,
    id_creator_user: userId,
  });
};

export const editEvent = async (event, userId) => {
  const original = await getEventById(event.id);
  if (!original) throw new Error('Evento no encontrado.');
  if (original.id_creator_user !== userId) throw new Error('No puedes modificar este evento.');

  return await updateEvent(event);
};

export const removeEvent = async (id, userId) => {
  const original = await getEventById(id);
  if (!original) throw new Error('Evento no encontrado.');
  if (original.id_creator_user !== userId) throw new Error('No puedes eliminar este evento.');

  return await deleteEvent(id);
};
