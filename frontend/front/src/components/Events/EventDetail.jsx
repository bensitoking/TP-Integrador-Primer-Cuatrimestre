import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { 
  getEventById, 
  enrollInEvent, 
  cancelEnrollment,
  deleteEvent 
} from '../../services/eventService'
import { AuthContext } from '../../context/AuthContext'

const EventDetail = ({ showAlert }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useContext(AuthContext)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [loadingAction, setLoadingAction] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id)
        setEvent(eventData)
        
        if (isAuthenticated && user) {
          const enrolled = eventData.participants.includes(user._id)
          setIsEnrolled(enrolled)
        }
      } catch (error) {
        showAlert('Error al cargar el evento', 'error')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id, isAuthenticated, user, navigate, showAlert])

  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      showAlert('Debes iniciar sesión para inscribirte', 'error')
      return
    }

    setLoadingAction(true)
    try {
      if (isEnrolled) {
        await cancelEnrollment(id)
        setIsEnrolled(false)
        showAlert('Inscripción cancelada', 'success')
      } else {
        await enrollInEvent(id)
        setIsEnrolled(true)
        showAlert('Inscripción exitosa', 'success')
      }
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error al procesar la inscripción', 'error')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este evento?')) return

    setLoadingAction(true)
    try {
      await deleteEvent(id)
      showAlert('Evento eliminado correctamente', 'success')
      navigate('/mis-eventos')
    } catch (error) {
      showAlert('Error al eliminar el evento', 'error')
    } finally {
      setLoadingAction(false)
    }
  }

  if (loading) return <div className="text-center py-8">Cargando evento...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <p className="text-gray-700 mb-6">{event.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <h3 className="font-semibold">Fecha y hora</h3>
                  <p>{format(new Date(event.date), "PPPPp", { locale: es })}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <h3 className="font-semibold">Ubicación</h3>
                  <p>{event.location?.name || 'No especificada'}</p>
                  <p className="text-sm text-gray-600">
                    {event.location?.address}, {event.location?.city}, {event.location?.province}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h3 className="font-semibold">Duración</h3>
                  <p>{event.duration} horas</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <div>
                  <h3 className="font-semibold">Capacidad</h3>
                  <p>{event.participants.length} / {event.capacity} participantes</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Organizador</h3>
              <p>{event.creator?.name || 'Organizador desconocido'}</p>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Información de inscripción</h3>
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Precio:</span>
                <span className="text-2xl font-bold">${event.price}</span>
              </div>
              
              {isAuthenticated && (
                <button
                  onClick={handleEnrollment}
                  disabled={loadingAction}
                  className={`w-full mb-4 ${isEnrolled ? 'btn-danger' : 'btn-primary'}`}
                >
                  {loadingAction ? 'Procesando...' : 
                   isEnrolled ? 'Cancelar inscripción' : 'Inscribirse'}
                </button>
              )}
              
              {!isAuthenticated && (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full btn-primary mb-4"
                >
                  Inicia sesión para inscribirte
                </button>
              )}
              
              {user && user._id === event.creator?._id && (
                <>
                  <button
                    onClick={() => navigate(`/editar-evento/${event._id}`)}
                    className="w-full btn-secondary mb-2"
                  >
                    Editar evento
                  </button>
                  <button
                    onClick={handleDeleteEvent}
                    disabled={loadingAction}
                    className="w-full btn-danger"
                  >
                    Eliminar evento
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail