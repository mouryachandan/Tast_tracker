import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post('/auth/login', form);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    navigate('/dashboard'); // ✅ yahan '/dashboard' karna tha
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <div className="form-actions">
          <button type="submit">Login</button>
          <Link to="/signup" className="form-link">Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
