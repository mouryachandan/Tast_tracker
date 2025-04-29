import { useEffect, useState } from "react";
import API from "../api/api";
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); // Track which task is being edited
  const [viewTask, setViewTask] = useState(null); // Track the task to view

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await API.get('/task');
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/task/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/task/${editTask._id}`, editTask);
    setEditTask(null);
    fetchTasks(); // Refresh task list
  };

  const handleRead = async (id) => {
    const { data } = await API.get(`/task/${id}`);
    setViewTask(data); // Set the task data to display in a modal or a new section
  };

  return (
    <div className="tasklist-container">
      <h2 className="tasklist-heading">Task List</h2>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-desc">{task.description}</p>
            <p className="task-status">Status: {task.status}</p>
            <p className="task-date">
              Date: {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "No Date"}
            </p>

            <button onClick={() => handleDelete(task._id)} className="task-delete-button">Delete</button>
            <button onClick={() => setEditTask(task)} className="task-edit-button">Edit</button>
            <button onClick={() => handleRead(task._id)} className="task-read-button">Read</button> {/* Read button */}
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks available.</p>
      )}

      {/* Edit Task Form */}
      {editTask && (
        <form onSubmit={handleUpdate} className="edit-form">
          <h3>Edit Task</h3>
          <input
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            placeholder="Title"
            required
            className="form-input"
          />
          <textarea
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            placeholder="Description"
            className="form-textarea"
          />
          <select
            value={editTask.status}
            onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
            className="form-select"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" className="task-update-button">Update</button>
          <button type="button" onClick={() => setEditTask(null)} className="task-cancel-button">Cancel</button>
        </form>
      )}

      {/* View Task Modal or Details */}
      {viewTask && (
        <div className="task-view-modal">
          <h3>Task Details</h3>
          <p><strong>Title:</strong> {viewTask.title}</p>
          <p><strong>Description:</strong> {viewTask.description}</p>
          <p><strong>Status:</strong> {viewTask.status}</p>
          <p><strong>Created At:</strong> {new Date(viewTask.createdAt).toLocaleDateString()}</p>
          <p><strong>Completed At:</strong> {viewTask.completedAt ? new Date(viewTask.completedAt).toLocaleDateString() : "Not Completed"}</p>
          <button onClick={() => setViewTask(null)} className="task-close-button">Close</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
