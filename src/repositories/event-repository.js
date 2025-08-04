import supabase from '../configs/db-config.js';

export const getAllEvents = async () => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) throw error;
  return data;
};

export const getEventById = async (id) => {
  const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const createEvent = async (event) => {
  const { data, error } = await supabase.from('events').insert([event]).single();
  if (error) throw error;
  return data;
};

export const updateEvent = async (event) => {
  const { data, error } = await supabase.from('events').update(event).eq('id', event.id).single();
  if (error) throw error;
  return data;
};

export const deleteEvent = async (id) => {
  const { data, error } = await supabase.from('events').delete().eq('id', id).single();
  if (error) throw error;
  return data;
};
