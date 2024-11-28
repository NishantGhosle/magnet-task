import React, { useState } from "react";
import { Task } from "./Tasks";

const TaskEdit = ({ task, onEditTask, onDeleteTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [due_date, setDueDate] = useState(
    task.due_date ? task.due_date.toISOString().split("T")[0] : ""
  );
  const [status, setStatus] = useState(task.status);

  const handleEditTask = (e) => {
    e.preventDefault();
    const updatedTask = new Task(
      task.id,
      title,
      description,
      due_date ? new Date(due_date) : undefined,
      status
    );
    onEditTask(updatedTask);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="task-edit-form">
      <h3>Edit Task</h3>
      <form onSubmit={handleEditTask}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="due_date">Due Date:</label>
        <input
          type="date"
          id="due_date"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <div className="button-group">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDeleteTask}>
            Delete Task
          </button>
          <button type="button" onClick={() => window.history.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
