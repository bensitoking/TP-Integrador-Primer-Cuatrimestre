import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const EventCard = ({ event }) => {
  return (
    <article className="card">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-3">{event.description}</p>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="mr-2">📅</span>
          <span>{format(new Date(event.date), "PPPPp", { locale: es })}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-lg">${event.price}</span>
          <Link to={`/events/${event._id}`} className="btn-primary text-sm">Ver detalles</Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
