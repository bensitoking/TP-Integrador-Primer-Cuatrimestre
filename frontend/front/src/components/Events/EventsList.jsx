import { useState, useEffect, useContext } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import { AuthContext } from "../../context/AuthContext";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/event", {
          headers: isAuthenticated ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
        });
        setEvents(response.data);
      } catch (err) {
        setError('Error al cargar eventos. Intente más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [isAuthenticated]);

  if (loading) return <div className="text-center py-8">Cargando eventos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="events-container">
      <h2 className="text-2xl font-bold mb-4">Eventos Disponibles</h2>

      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-600">No hay eventos disponibles</div>
      ) : (
        <div className="events-grid">
          {events.map(event => <EventCard key={event._id} event={event} />)}
        </div>
      )}
    </div>
  );
}
