import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getEventById, enrollInEvent, cancelEnrollment, deleteEvent } from '../../services/eventService';
import { AuthContext } from '../../context/AuthContext';

const EventDetail = ({ showAlert }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
        if (isAuthenticated && user) {
          setIsEnrolled(eventData.participants?.includes(user._id));
        }
      } catch (err) {
        showAlert?.('Error al cargar el evento', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, isAuthenticated, user, navigate, showAlert]);

  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      showAlert?.('Debes iniciar sesión para inscribirte', 'error');
      return;
    }
    setLoadingAction(true);
    try {
      if (isEnrolled) {
        await cancelEnrollment(id);
        setIsEnrolled(false);
        showAlert?.('Inscripción cancelada', 'success');
      } else {
        await enrollInEvent(id);
        setIsEnrolled(true);
        showAlert?.('Inscripción exitosa', 'success');
      }
    } catch (err) {
      showAlert?.(err.response?.data?.message || 'Error al procesar la inscripción', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este evento?')) return;
    setLoadingAction(true);
    try {
      await deleteEvent(id);
      showAlert?.('Evento eliminado correctamente', 'success');
      navigate('/my-events');
    } catch (err) {
      showAlert?.('Error al eliminar el evento', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando evento...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <p className="text-gray-700 mb-6">{event.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Fecha y hora</h3>
                <p className="event-meta">{format(new Date(event.date), "PPPPp", { locale: es })}</p>
              </div>

              <div>
                <h3 className="font-semibold">Ubicación</h3>
                <p className="event-meta">{event.location?.name || 'No especificada'}</p>
              </div>

              <div>
                <h3 className="font-semibold">Duración</h3>
                <p className="event-meta">{event.duration} horas</p>
              </div>

              <div>
                <h3 className="font-semibold">Capacidad</h3>
                <p className="event-meta">{event.participants?.length || 0} / {event.capacity} participantes</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(event.tags || []).map(tag => <span key={tag} className="tag-chip">{tag}</span>)}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Organizador</h3>
              <p>{event.creator?.name || 'Organizador desconocido'}</p>
            </div>
          </div>

          <aside className="md:w-1/3">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Información de inscripción</h3>

              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Precio:</span>
                <span className="text-2xl font-bold">${event.price}</span>
              </div>

              {isAuthenticated ? (
                <button onClick={handleEnrollment} disabled={loadingAction} className={`w-full mb-4 ${isEnrolled ? 'btn-danger' : 'btn-primary'}`}>
                  {loadingAction ? 'Procesando...' : (isEnrolled ? 'Cancelar inscripción' : 'Inscribirse')}
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="w-full btn-primary mb-4">Inicia sesión para inscribirte</button>
              )}

              {user && user._id === event.creator?._id && (
                <>
                  <button onClick={() => navigate(`/editar-evento/${event._id}`)} className="w-full btn-secondary mb-2">Editar evento</button>
                  <button onClick={handleDeleteEvent} disabled={loadingAction} className="w-full btn-danger">Eliminar evento</button>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
