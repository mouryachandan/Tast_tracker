import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"; // ⭐
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import TaskList from "./pages/TaskList";

import './App.css';

const App = () => {
  const [token, setToken] = useState(null); // ⭐

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <Router>
      {/* ⭐ Show Navbar for logged-in users only */}
      {token && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-project" 
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-task" 
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
