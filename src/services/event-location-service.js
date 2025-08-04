import {
  getUserLocations,
  getLocationById,
  createLocation,
} from '../repositories/event-location-repository.js';
import { isShortText, isPositiveNumber } from '../helpers/validations-helper.js';

export const fetchUserLocations = async (userId) => {
  return await getUserLocations(userId);
};

export const fetchLocationById = async (id, userId) => {
  const location = await getLocationById(id);
  if (!location || location.id_creator_user !== userId)
    throw new Error('Ubicación no encontrada o no autorizada');
  return location;
};

export const addLocation = async (location, userId) => {
  const {
    name,
    full_address,
    id_location,
    max_capacity,
    latitude,
    longitude
  } = location;

  if (isShortText(name) || isShortText(full_address)) {
    throw new Error('Nombre o dirección inválidos');
  }

  if (!id_location || !isPositiveNumber(max_capacity)) {
    throw new Error('Ubicación o capacidad inválida');
  }

  return await createLocation({
    name,
    full_address,
    id_location,
    max_capacity,
    latitude,
    longitude,
    id_creator_user: userId
  });
};
