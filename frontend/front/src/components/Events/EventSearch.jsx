import { useState, useContext } from 'react';
import { EventContext } from '../../context/EventContext';

const EventSearch = ({ showAlert }) => {
  const { searchParams, setSearchParams, setCurrentPage } = useContext(EventContext);
  const [localSearch, setLocalSearch] = useState({
    name: searchParams?.name || '',
    startDate: searchParams?.startDate || '',
    tag: searchParams?.tag || ''
  });

  const handleChange = (e) => setLocalSearch({...localSearch, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = Object.fromEntries(Object.entries(localSearch).filter(([_,v]) => v !== ''));
    setSearchParams(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setLocalSearch({ name:'', startDate:'', tag:'' });
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Buscar Eventos</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input name="name" value={localSearch.name} onChange={handleChange} className="input-field" placeholder="Buscar por nombre" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input name="startDate" type="date" value={localSearch.startDate} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
          <input name="tag" value={localSearch.tag} onChange={handleChange} className="input-field" placeholder="Ej: música, deporte" />
        </div>
        <div className="flex items-end space-x-2">
          <button type="submit" className="btn-primary flex-1">Buscar</button>
          <button type="button" onClick={handleReset} className="btn-secondary flex-1">Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default EventSearch;
