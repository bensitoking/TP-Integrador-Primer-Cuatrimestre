import supabase from '../configs/db-config.js';

export const findUserByUsername = async (username) => {
  const { data, error } = await supabase.from('users').select('*').eq('username', username).single();
  if (error) throw error;
  return data;
};

export const createUser = async (user) => {
  const { data, error } = await supabase.from('users').insert([user]).single();
  if (error) throw error;
  return data;
};
