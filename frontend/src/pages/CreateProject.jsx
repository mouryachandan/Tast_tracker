import { useState } from "react";
import API from "../api/api";
import './CreateProject.css'; // Import the CSS file

const CreateProject = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/project', { name });
    setName('');
    alert('Project Created!');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Create Project</h2>
        <input 
          placeholder="Project Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="form-input"
        />
        <button type="submit" className="form-button">Create</button>
      </form>
    </div>
  );
};

export default CreateProject;
