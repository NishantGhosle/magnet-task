import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/TaskDetails.css";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/tasks/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, editMode]);

  const handleDelete = () => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this task?</p>
          <button
            style={{ margin: "10px", padding: "5px" }}
            onClick={() => confirmDelete(t)}
          >
            Yes
          </button>
          <button
            style={{ margin: "10px", padding: "5px" }}
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      ),
      { duration: 4000 }
    );
  };

  const confirmDelete = async (t) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/tasks/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task deleted successfully");
      toast.dismiss(t.id);
      navigate("/taskList");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/tasks/tasks/${id}`,
        updatedTaskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task edited successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTaskData({
      ...updatedTaskData,
      [name]: value,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setUpdatedTaskData({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.due_date && (
        <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      )}
      <p>Status: {task.status}</p>
      <div className="button-container">
        <button id="delete_button" onClick={handleDelete}>
          Delete
        </button>
        {editMode ? (
          <>
            <button id="save_button" onClick={handleEdit}>
              Save
            </button>
            <button id="cancel_button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button id="edit_button" onClick={toggleEditMode}>
            Edit
          </button>
        )}
      </div>

      {editMode && (
        <div className="edit-form">
          <label htmlFor="edit_title">Title:</label>
          <input
            type="text"
            id="edit_title"
            name="title"
            value={updatedTaskData.title}
            onChange={handleInputChange}
          />
          <label htmlFor="edit_description">Description:</label>
          <textarea
            id="edit_description"
            name="description"
            value={updatedTaskData.description}
            onChange={handleInputChange}
          />
          <label htmlFor="edit_due_date">Due Date:</label>
          <input
            type="date"
            id="edit_due_date"
            name="due_date"
            value={updatedTaskData.due_date}
            onChange={handleInputChange}
          />
          <label htmlFor="edit_status">Status:</label>
          <select
            id="edit_status"
            name="status"
            value={updatedTaskData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
