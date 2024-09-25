import React, { useState } from "react";
import axios from "axios";
import "../css/TaskForm.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const taskData = { title, description, due_date };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!taskData.due_date) {
        toast.error("please select a date");
      }
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/tasks",
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.data) {
        navigate("/taskList");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
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
          type="text"
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
        <button type="submit">Create Task</button>
        <button
          onClick={() => {
            navigate("/taskList");
          }}
        >
          View Tasks
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
