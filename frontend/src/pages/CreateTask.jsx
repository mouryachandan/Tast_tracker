import { useState } from "react";
import API from "../api/api";
import './CreateTask.css'; // ⭐ import the CSS file

const CreateTask = () => {
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    status: 'Pending',
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      ...form,
      date: form.date || new Date().toISOString(), // ensure date is valid
    };

    await API.post('/task', taskData);
    setForm({ title: '', description: '', status: 'Pending', date: '' });
    alert('Task Created!');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Create Task</h2>

        <input 
          placeholder="Title" 
          value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
          required 
          className="form-input"
        />

        <textarea 
          placeholder="Description" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="form-textarea"
        />

        <select 
          value={form.status} 
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="form-select"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label className="form-label">Due Date</label>
        <input 
          type="date" 
          value={form.date} 
          onChange={(e) => setForm({ ...form, date: e.target.value })} 
          className="form-input"
          required
        />

        <button type="submit" className="form-button">Create</button>
      </form>
    </div>
  );
};

export default CreateTask;
