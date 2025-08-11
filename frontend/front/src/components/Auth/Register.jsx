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

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.firstName.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }
    if (formData.lastName.trim().length < 3) {
      setError('El apellido debe tener al menos 3 caracteres.');
      return;
    }
    if (!isValidEmail(formData.username.trim())) {
      setError('El email es inválido.');
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

      const response = await registerUser(payload);
      const token = response?.token || response?.data?.token;

      if (token) {
        login(token);
        navigate('/events');
        window.location.reload();
        return;
      }
      if (response?.status === 201 || response?.data?.success) {
        navigate('/login');
        return;
      }

      setError('Registro fallido. Intente nuevamente.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
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
            placeholder="Email (será tu username)"
            value={formData.username}
            onChange={handleChange}
            required
            type="email"
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
