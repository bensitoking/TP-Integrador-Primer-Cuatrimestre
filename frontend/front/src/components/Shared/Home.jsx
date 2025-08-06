import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Bienvenido a la App de Eventos</h1>
      <div className="flex gap-4">
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
  )
}

export default Home