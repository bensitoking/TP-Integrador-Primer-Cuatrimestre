import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { registerUser } from '../../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones frontend
    if (formData.firstName.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }
    if (formData.lastName.trim().length < 3) {
      setError('El apellido debe tener al menos 3 caracteres.');
      return;
    }
    if (formData.password.length < 3) {
      setError('La contraseña debe tener al menos 3 caracteres.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        username: formData.username.trim(),
        password: formData.password
      };
    
      const data = await registerUser(payload); // data ya es el body JSON del backend
    
      if (data.success) {
        navigate('/login');
        return;
      }
    
      setError(data.message || 'Registro fallido. Intente nuevamente.');
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    }
    
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="text-2xl font-bold mb-4">Registrarse</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              className="input-field"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              className="input-field"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="username"
            className="input-field"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            type="text"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="password"
              className="input-field"
              placeholder="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              name="confirmPassword"
              className="input-field"
              placeholder="Confirmar contraseña"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
