import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';  // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/create-project" className="navbar-link">Create Project</Link>
        <Link to="/create-task" className="navbar-link">Create Task</Link>
        <Link to="/tasks" className="navbar-link">Tasks</Link>
      </div>
      <button className="navbar-logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
