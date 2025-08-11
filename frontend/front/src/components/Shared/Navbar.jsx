import { Link } from "react-router-dom";

export default function Navbar() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <header className="navbar">
      <div className="site-max flex items-center justify-between py-3">
        <Link to="/" className="logo">EventApp</Link>

        <nav className="hidden md:flex items-center gap-4">
          <Link to="/events" className="nav-link">Eventos</Link>

          {isAuthenticated ? (
            <>
              <Link to="/my-events" className="nav-link">Mis Eventos</Link>
              <Link to="/create-event" className="nav-link">Crear Evento</Link>
              <Link to="/locations" className="nav-link">Ubicaciones</Link>

              <button
                className="nav-link"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
              <Link to="/register" className="btn-secondary">Registrarse</Link>
            </>
          )}
        </nav>

        {/* versión simple mobile */}
        <div className="md:hidden">
          <Link to="/events" className="nav-link">Eventos</Link>
        </div>
      </div>
    </header>
  );
}
