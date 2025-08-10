// src/repositories/user-repository.js
import supabase from '../configs/db-config.js';

export const findUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data || null;
};

export const createUser = async (user) => {
  const { data, error } = await supabase.from('users').insert([user]).select().single();
  if (error) throw error;
  return data;
};
