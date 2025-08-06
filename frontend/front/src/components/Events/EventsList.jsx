import { useState, useEffect, useContext } from "react"
import axios from "axios"
import EventCard from "./EventCard"
import { AuthContext } from "../../context/AuthContext"

export default function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/event", {
          headers: isAuthenticated ? {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          } : {}
        })
        setEvents(response.data)
      } catch (error) {
        setError('Error al cargar eventos. Intente más tarde.')
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [isAuthenticated])

  if (loading) return <div className="loading">Cargando eventos...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="events-container">
      <h2>Eventos Disponibles</h2>
      <div className="events-grid">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No hay eventos disponibles</p>
        )}
      </div>
    </div>
  )
}