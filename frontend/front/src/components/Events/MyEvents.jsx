import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMyEvents } from '../../services/eventService';
import { AuthContext } from '../../context/AuthContext';
import EventCard from './EventCard';

const MyEvents = ({ showAlert }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const myEvents = await getMyEvents();
        setEvents(myEvents);
      } catch (err) {
        showAlert?.('Error al cargar tus eventos', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [showAlert]);

  if (loading) return <div className="text-center py-8">Cargando tus eventos...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Eventos</h1>
        <Link to="/create-event" className="btn-primary">Crear Nuevo Evento</Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No has creado ningún evento todavía.</p>
          <Link to="/create-event" className="btn-primary inline-block">Crear mi primer evento</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(ev => (
            <div key={ev._id} className="relative">
              <EventCard event={ev} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link to={`/editar-evento/${ev._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full">
                  ✎
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
