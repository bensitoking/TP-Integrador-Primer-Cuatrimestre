import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Configuración de axios para incluir el token en las peticiones
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getEvents = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({ page, ...filters }).toString()
  const response = await axios.get(`${API_URL}/event?${params}`)
  return response.data
}

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/event/${id}`)
  return response.data
}

export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/event`, eventData)
  return response.data
}

export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/event/${id}`, eventData)
  return response.data
}

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/event/${id}`)
  return response.data
}

export const enrollInEvent = async (id) => {
  const response = await axios.post(`${API_URL}/event/${id}/enrollment`)
  return response.data
}

export const cancelEnrollment = async (id) => {
  const response = await axios.delete(`${API_URL}/event/${id}/enrollment`)
  return response.data
}

export const getMyEvents = async () => {
  const response = await axios.get(`${API_URL}/event/my-events`)
  return response.data
}

export const getEventLocations = async () => {
  const response = await axios.get(`${API_URL}/event-location`)
  return response.data
}

export const createEventLocation = async (locationData) => {
  const response = await axios.post(`${API_URL}/event-location`, locationData)
  return response.data
}

export const updateEventLocation = async (id, locationData) => {
  const response = await axios.put(`${API_URL}/event-location/${id}`, locationData)
  return response.data
}

export const deleteEventLocation = async (id) => {
  const response = await axios.delete(`${API_URL}/event-location/${id}`)
  return response.data
}