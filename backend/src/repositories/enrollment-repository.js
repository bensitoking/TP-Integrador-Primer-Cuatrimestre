import supabase from '../configs/db-config.js';

export const getEnrollmentsByEvent = async (eventId) => {
  const { data, error } = await supabase
    .from('event_enrollments')
    .select('*, user:users(*)')
    .eq('id_event', eventId);
  if (error) throw error;
  return data;
};

export const getEnrollment = async (eventId, userId) => {
  const { data, error } = await supabase
    .from('event_enrollments')
    .select('*')
    .eq('id_event', eventId)
    .eq('id_user', userId)
    .single();
  return data;
};

export const addEnrollment = async (enrollment) => {
  const { data, error } = await supabase
    .from('event_enrollments')
    .insert([enrollment])
    .single();
  if (error) throw error;
  return data;
};

export const deleteEnrollment = async (eventId, userId) => {
  const { data, error } = await supabase
    .from('event_enrollments')
    .delete()
    .eq('id_event', eventId)
    .eq('id_user', userId);
  if (error) throw error;
  return data;
};
