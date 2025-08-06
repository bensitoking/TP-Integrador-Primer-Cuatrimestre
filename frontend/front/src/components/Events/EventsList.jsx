import { useState, useEffect, useContext } from 'react'
import { getEvents } from '../../services/eventService'
import EventCard from './EventCard'
import EventSearch from './EventSearch'
import { EventContext } from '../../context/EventContext'

const EventsList = ({ showAlert }) => {
  const { events, setEvents, currentPage, setCurrentPage, totalPages, setTotalPages, searchParams } = useContext(EventContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents(currentPage, searchParams)
        setEvents(response.events)
        setTotalPages(response.totalPages)
      } catch (error) {
        showAlert('Error al cargar eventos', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [currentPage, searchParams, setEvents, setTotalPages, showAlert])

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  if (loading) return <div className="text-center py-8">Cargando eventos...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Eventos Disponibles</h1>
      
      <EventSearch showAlert={showAlert} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron eventos
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn-secondary disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="self-center">Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn-secondary disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default EventsList