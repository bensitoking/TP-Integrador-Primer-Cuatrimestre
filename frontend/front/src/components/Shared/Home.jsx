import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-6 py-16 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Bienvenido a EventApp</h1>
        <p className="text-gray-600 mb-8">Descubrí y creá eventos cerca tuyo. Gestioná inscripciones y conectá con la comunidad.</p>

        <div className="flex items-center justify-center gap-4">
          {isAuthenticated ? (
            <Link to="/events" className="btn-primary">Ver Eventos</Link>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
              <Link to="/register" className="btn-secondary">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
