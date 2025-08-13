import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/user/login", { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/events");
      window.location.reload();
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary w-full">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
