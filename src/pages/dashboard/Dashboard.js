import React, { useState, useEffect } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "incomplete",
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("dueDate");
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the ID of the task being edited
  const [editingTaskData, setEditingTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  useEffect(() => {
    axios
      .post("/api/dashboard", { tasks })
      .then((response) => {
        // Handle successful data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle data errors
        console.error(error);
      });
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      const dummyTasks = [
        {
          id: 1,
          title: "Task 1",
          description: "Do something",
          dueDate: "2023-07-10",
          status: "incomplete",
        },
        {
          id: 2,
          title: "Task 2",
          description: "Do something else",
          dueDate: "2023-07-12",
          status: "in progress",
        },
        {
          id: 3,
          title: "Task 3",
          description: "Do another thing",
          dueDate: "2023-07-15",
          status: "completed",
        },
      ];
      setTasks(dummyTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const handleAddTask = () => {
    const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      status: "incomplete",
    });
  };

  const handleUpdateTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...editingTaskData } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskData({
      title: "",
      description: "",
      dueDate: "",
      status: "",
    });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditingTaskData(taskToEdit);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskData({
      title: "",
      description: "",
      dueDate: "",
      status: "",
    });
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sort === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <div className="task-manager">
        <h1>Task Management App</h1>
        <form className="task-form">
          <label>
            Title:
            <br />
            <input
              type="text"
              name="title"
              value={newTask.title}
              className="inputfield-task"
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <br />
            <textarea
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className="inputfield-task"
            />
          </label>
          <div className="form-select">
            <label>
              Due Date:
              <br />
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="select-field"
              />
            </label>
            <label>
              Status:
              <br />
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="select-field"
              >
                <option value="incomplete">Incomplete</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>
          <button type="button" onClick={handleAddTask} className="task-btn">
            Add Task
          </button>
        </form>
        <div className="filter">
          <label>
            Filter:
            <br />
            <select
              value={filter}
              onChange={handleFilterChange}
              className="select-field"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </label>
          <label>
            Sort By:
            <br />
            <select
              value={sort}
              onChange={handleSortChange}
              className="select-field"
            >
              <option value="dueDate">Due Date</option>
              <option value="status">Status</option>
            </select>
          </label>
        </div>
        <ul>
          {sortedTasks.map((task) => (
            <li key={task.id}>
              {editingTaskId === task.id ? (
                <div className="task-form">
                  <label>
                    Title:
                    <br />
                    <input
                      type="text"
                      name="title"
                      value={editingTaskData.title}
                      className="inputfield-task"
                      onChange={(e) =>
                        setEditingTaskData({
                          ...editingTaskData,
                          title: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Description:
                    <br />
                    <textarea
                      type="text"
                      name="description"
                      className="inputfield-task"
                      value={editingTaskData.description}
                      onChange={(e) =>
                        setEditingTaskData({
                          ...editingTaskData,
                          description: e.target.value,
                        })
                      }
                    />
                  </label>
                  <div>
                    <label>
                      Due Date:
                      <br />
                      <input
                        type="date"
                        name="dueDate"
                        value={editingTaskData.dueDate}
                        className="select-field"
                        onChange={(e) =>
                          setEditingTaskData({
                            ...editingTaskData,
                            dueDate: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Status:
                      <br />
                      <select
                        name="status"
                        value={editingTaskData.status}
                        className="select-field"
                        onChange={(e) =>
                          setEditingTaskData({
                            ...editingTaskData,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="incomplete">Incomplete</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </label>
                  </div>
                  <button
                    className="task-btn2"
                    onClick={() => handleUpdateTask(task.id)}
                  >
                    Save
                  </button>
                  <button className="task-btn2" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="added-task">
                  <div className="updates">
                    <div>Title: {task.title}</div>
                    <div>Description: {task.description}</div>
                    <div>Due Date: {task.dueDate}</div>
                    <div>Status: {task.status}</div>
                    <button
                      className="task-btn3"
                      onClick={() => handleEditTask(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="task-btn3"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default Dashboard;
