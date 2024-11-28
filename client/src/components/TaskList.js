import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../css/TaskDetails.css";
import "../css/TaskList.css";

const apiUrl = "http://localhost:5000/tasks/taskList";

const TaskList = () => {
  const [taskList, setTaskList] = useState({ tasks: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${apiUrl}?page=${currentPage + 1}&per_page=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTaskList(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTaskList();
  }, [currentPage]);

  return (
    <>
      <div className="grid">
        {taskList.tasks.length === 0 ? (
          <h3>No tasks available</h3>
        ) : (
          taskList.tasks.map((task) => (
            <div
              key={task._id}
              className={`card ${
                task.status === "pending" ? "pending" : "completed"
              }`}
            >
              <h3>{task.title}</h3>
              {task.due_date && (
                <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
              )}
              <p>Status: {task.status}</p>
              <Link to={`/tasks/${task._id}`}>View details</Link>
            </div>
          ))
        )}
      </div>

      {taskList.tasks.length > 0 && (
        <div className="pagination-container">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={Math.ceil(taskList.total / itemsPerPage)}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      )}
    </>
  );
};

export default TaskList;
