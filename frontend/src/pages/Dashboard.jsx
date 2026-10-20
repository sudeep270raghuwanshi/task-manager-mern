// import { useState, useEffect } from "react";
// import api from "../services/api.js";

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await api.get("/tasks", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = response.data;

//         setTasks(
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data.tasks)
//               ? data.tasks
//               : []
//         );
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//           "Failed to fetch tasks"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   if (loading) {
//     return <h2>Loading tasks...</h2>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>My Tasks</h1>

//       {tasks.length === 0 ? (
//         <p>No tasks found. Create your first task!</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task._id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p>Status: {task.status}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import { useState, useEffect } from "react";
// import api from "../services/api.js";

// function Dashboard() {

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await api.get("/tasks");

//         const data = response.data;

//         setTasks(
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data.tasks)
//               ? data.tasks
//               : []
//         );
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             "Failed to fetch tasks"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   if (loading) {
//     return <h2>Loading tasks...</h2>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>My Tasks</h1>

//       {tasks.length === 0 ? (
//         <p>No tasks found. Create your first task!</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task._id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p>Status: {task.status}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Dashboard;

//next modification

// import { useState, useEffect } from "react";
// import api from "../services/api.js";

// function Dashboard() {
//   //new
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     status: "pending",
//     dueDate: "",
//   });

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await api.get("/tasks");

//         const data = response.data;

//         setTasks(
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data.tasks)
//               ? data.tasks
//               : [],
//         );
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch tasks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   //new
//   const handleCreateTask = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         ...formData,
//         dueDate: formData.dueDate || null,
//       };

//       const response = await api.post("/tasks", payload);

//       const newTask = response.data.task ?? response.data;

//       setTasks((prevTasks) => [...prevTasks, newTask]);

//       setFormData({
//         title: "",
//         description: "",
//         status: "pending",
//         dueDate: "",
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create task");
//     }
//   };

//   if (loading) {
//     return <h2>Loading tasks...</h2>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>My Tasks</h1>

//       {/* new */}
//       <form onSubmit={handleCreateTask}>
//         <h2>Create New Task</h2>

//         <input
//           type="text"
//           placeholder="Task title"
//           value={formData.title}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               title: e.target.value,
//             })
//           }
//           required
//         />

//         <textarea
//           placeholder="Task description"
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               description: e.target.value,
//             })
//           }
//         />

//         <select
//           value={formData.status}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               status: e.target.value,
//             })
//           }
//         >
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>

//         <input
//           type="date"
//           value={formData.dueDate}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               dueDate: e.target.value,
//             })
//           }
//         />

//         <button type="submit">Create Task</button>
//       </form>

//       {tasks.length === 0 ? (
//         <p>No tasks found. Create your first task!</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task._id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p>Status: {task.status}</p>

//             {/* new */}
//             <p>
//               Due Date:{" "}
//               {task.dueDate
//                 ? new Date(task.dueDate).toLocaleDateString()
//                 : "No due date"}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import { useState, useEffect } from "react";
// import api from "../services/api.js";
// import TaskForm from "../components/TaskForm.jsx";
// import TaskList from "../components/TaskList.jsx";

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch all tasks
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await api.get("/tasks");

//         const data = response.data;

//         setTasks(
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data.tasks)
//               ? data.tasks
//               : [],
//         );
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             "Failed to fetch tasks"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Create a new task
//   const handleCreateTask = async (formData, resetForm) => {
//     try {
//       const payload = {
//         ...formData,
//         dueDate: formData.dueDate || null,
//       };

//       const response = await api.post("/tasks", payload);

//       const newTask = response.data.task ?? response.data;

//       setTasks((prevTasks) => [...prevTasks, newTask]);

//       // Reset the form after successful creation
//       resetForm();

//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to create task"
//       );
//     }
//   };

//   if (loading) {
//     return <h2>Loading tasks...</h2>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>My Tasks</h1>

//       <TaskForm onCreateTask={handleCreateTask} />

//       <TaskList tasks={tasks} />
//     </div>
//   );
// }

// export default Dashboard;

//taskService.js feature implemetation k bad

// import { useState, useEffect } from "react";
// import { getTasks, createTask, } from "../services/taskService.js";
// import TaskForm from "../components/TaskForm.jsx";
// import TaskList from "../components/TaskList.jsx";

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch all tasks
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const data = await getTasks();

//         setTasks(
//           Array.isArray(data)
//             ? data
//             : Array.isArray(data.tasks)
//               ? data.tasks
//               : [],
//         );
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch tasks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Create a new task
//   const handleCreateTask = async (formData, onSuccess) => {
//     try {
//       setError("");

//       const newTask = await createTask(formData);

//       setTasks((prevTasks) => [...prevTasks, newTask]);

//       onSuccess(); //pehle yahi reserForm() likha tha but koi fark nahi padta prop ka naam hai bs
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create task");
//     }
//   };

//   if (loading) {
//     return <h2>Loading tasks...</h2>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>My Tasks</h1>

//       <TaskForm onCreateTask={handleCreateTask} />

//       <TaskList tasks={tasks} />
//     </div>
//   );
// }

// export default Dashboard;

// feature :delete/edit task k bad

import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();

        setTasks(
          Array.isArray(data)
            ? data
            : Array.isArray(data.tasks)
              ? data.tasks
              : [],
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Create a new task
  const handleCreateTask = async (formData, onSuccess) => {
    try {
      setError("");

      const newTask = await createTask(formData);

      setTasks((prevTasks) => [...prevTasks, newTask]);

      onSuccess(); //pehle yahi reserForm() likha tha but koi fark nahi padta prop ka naam hai bs
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError("");

      await deleteTask(id);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleUpdateTask = async (id, formData) => {
    try {
      setError("");
      setSuccess("");

      const updatedTask = await updateTask(id, formData);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task)),
      );

      setSuccess("Task updated successfully!");
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
      return false;
    }
  };

  if (loading) {
    return <h2>Loading tasks...</h2>;
  }

  // if (error) {
  //   return <p>{error}</p>;
  // }
  //when you remove if code
  //concept-You've learned an important real-world React concept: an API request can fail without breaking the entire UI.

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>My Tasks</h1>
      <button onClick={handleLogout}>Logout</button>

      {error && <p className="error">{error}</p>}
      {success && <p>{success}</p>}

      <TaskForm onCreateTask={handleCreateTask} />

      {/* <TaskList tasks={tasks} /> */}
      {/* <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} /> */}
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}

export default Dashboard;
