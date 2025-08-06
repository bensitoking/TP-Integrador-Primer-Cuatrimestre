import supabase from '../configs/db-config.js';

export const getUserLocations = async (userId) => {
  const { data, error } = await supabase
    .from('event_locations')
    .select('*')
    .eq('id_creator_user', userId);
  if (error) throw error;
  return data;
};

export const getLocationById = async (id) => {
  const { data, error } = await supabase
    .from('event_locations')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const createLocation = async (location) => {
  const { data, error } = await supabase
    .from('event_locations')
    .insert([location])
    .single();
  if (error) throw error;
  return data;
};
