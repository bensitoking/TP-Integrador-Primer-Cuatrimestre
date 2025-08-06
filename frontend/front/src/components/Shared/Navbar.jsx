import { Link } from "react-router-dom"

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token")

  return (
    <nav className="navbar">
      <Link to="/" className="logo">EventApp</Link>
      <div className="nav-links">
        <Link to="/events">Eventos</Link>
        {isAuthenticated ? (
          <>
            <Link to="/my-events">Mis Eventos</Link>
            <Link to="/create-event">Crear Evento</Link>
            <Link to="/locations">Ubicaciones</Link>
            <button onClick={() => {
              localStorage.removeItem("token")
              window.location.reload()
            }}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  )
}