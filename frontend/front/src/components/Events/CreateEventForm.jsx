import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent, updateEvent, getEventLocations } from '../../services/eventService'

const CreateEventForm = ({ showAlert }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    duration: 1,
    price: 0,
    capacity: 10,
    tags: '',
    location: ''
  })
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingLocations, setLoadingLocations] = useState(true)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await getEventLocations()
        setLocations(locationsData)
        if (locationsData.length > 0) {
          setFormData(prev => ({ ...prev, location: locationsData[0]._id }))
        }
      } catch (error) {
        showAlert('Error al cargar ubicaciones', 'error')
      } finally {
        setLoadingLocations(false)
      }
    }

    fetchLocations()
  }, [showAlert])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'tags' ? value : 
              name === 'duration' || name === 'price' || name === 'capacity' ? 
              Math.max(0, Number(value)) : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.date) {
      showAlert('Por favor completa todos los campos requeridos', 'error')
      return
    }

    if (formData.duration <= 0) {
      showAlert('La duración debe ser mayor a 0', 'error')
      return
    }

    setLoading(true)
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      const eventData = {
        ...formData,
        tags: tagsArray,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        duration: Number(formData.duration)
      }

      await createEvent(eventData)
      showAlert('Evento creado exitosamente', 'success')
      navigate('/mis-eventos')
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error al crear el evento', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loadingLocations) return <div className="text-center py-8">Cargando ubicaciones...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Evento</h1>
      
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field h-32"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora *</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duración (horas) *</label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              required
            >
              {locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (separados por comas)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input-field"
            placeholder="Ej: música, deporte, arte"
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/mis-eventos')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Creando...' : 'Crear Evento'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEventForm