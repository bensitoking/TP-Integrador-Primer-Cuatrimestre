import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/user/login`, credentials)
  return response.data
}

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/user/register`, userData)
  return response.data
}