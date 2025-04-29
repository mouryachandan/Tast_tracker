import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const Signup = () => {
  const [form, setForm] = useState({ name: '', country: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/signup', form);
    navigate('/login');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Signup</h2>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Country" onChange={(e) => setForm({ ...form, country: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <div className="form-actions">
          <button type="submit">Signup</button>
          <Link to="/login" className="form-link">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
