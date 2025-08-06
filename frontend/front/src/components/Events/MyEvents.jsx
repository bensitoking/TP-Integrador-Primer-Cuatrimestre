import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getMyEvents } from '../../services/eventService'
import { AuthContext } from '../../context/AuthContext'
import EventCard from './EventCard'

const MyEvents = ({ showAlert }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const myEvents = await getMyEvents()
        setEvents(myEvents)
      } catch (error) {
        showAlert('Error al cargar tus eventos', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [showAlert])

  if (loading) return <div className="text-center py-8">Cargando tus eventos...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Eventos</h1>
        <Link to="/crear-evento" className="btn-primary">
          Crear Nuevo Evento
        </Link>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No has creado ningún evento todavía.</p>
          <Link to="/crear-evento" className="btn-primary inline-block">
            Crear mi primer evento
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event._id} className="relative">
              <EventCard event={event} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link 
                  to={`/editar-evento/${event._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEvents