import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { registerUser } from '../../services/authService'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      
      if (response.token) {
        login(response.token)
        navigate('/events')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario igual que antes */}
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}

export default Register