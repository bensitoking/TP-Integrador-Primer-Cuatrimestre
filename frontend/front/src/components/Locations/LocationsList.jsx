import { useState, useEffect } from 'react'
import { 
  getEventLocations, 
  createEventLocation, 
  updateEventLocation,
  deleteEventLocation 
} from '../../services/eventService'

const LocationsList = ({ showAlert }) => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    province: ''
  })

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await getEventLocations()
        setLocations(locationsData)
      } catch (error) {
        showAlert('Error al cargar ubicaciones', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [showAlert])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.address || !formData.city || !formData.province) {
      showAlert('Por favor completa todos los campos', 'error')
      return
    }

    try {
      setLoading(true)
      if (editingId) {
        await updateEventLocation(editingId, formData)
        showAlert('Ubicación actualizada exitosamente', 'success')
      } else {
        await createEventLocation(formData)
        showAlert('Ubicación creada exitosamente', 'success')
      }
      
      const updatedLocations = await getEventLocations()
      setLocations(updatedLocations)
      resetForm()
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error al guardar la ubicación', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (location) => {
    setEditingId(location._id)
    setFormData({
      name: location.name,
      address: location.address,
      city: location.city,
      province: location.province
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) return

    try {
      setLoading(true)
      await deleteEventLocation(id)
      showAlert('Ubicación eliminada exitosamente', 'success')
      const updatedLocations = await getEventLocations()
      setLocations(updatedLocations)
    } catch (error) {
      showAlert('Error al eliminar la ubicación', 'error')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      name: '',
      address: '',
      city: '',
      province: ''
    })
  }

  if (loading) return <div className="text-center py-8">Cargando ubicaciones...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mis Ubicaciones</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Editar Ubicación' : 'Agregar Nueva Ubicación'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
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
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ciudad *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Provincia *</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Tus Ubicaciones</h2>
          
          {locations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No has creado ninguna ubicación todavía.
            </div>
          ) : (
            <div className="space-y-4">
              {locations.map(location => (
                <div key={location._id} className="card p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{location.name}</h3>
                      <p className="text-sm text-gray-600">{location.address}</p>
                      <p className="text-sm text-gray-600">{location.city}, {location.province}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(location)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(location._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationsList