// function TaskList({ tasks }) {
//   if (tasks.length === 0) {
//     return <p>No tasks found. Create your first task!</p>;
//   }

//   return (
//     <div>
//       {tasks.map((task) => (
//         <div key={task._id}>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>
//           <p>Status: {task.status}</p>

//           <p>
//             Due Date:{" "}
//             {task.dueDate
//               ? new Date(task.dueDate).toLocaleDateString()
//               : "No due date"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TaskList;

// function TaskList({ tasks, onDeleteTask }) {
//   if (tasks.length === 0) {
//     return <p>No tasks found. Create your first task!</p>;
//   }

//   return (
//     <div>
//       {tasks.map((task) => (
//         <div key={task._id}>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>
//           <p>Status: {task.status}</p>

//           <p>
//             Due Date:{" "}
//             {task.dueDate
//               ? new Date(task.dueDate).toLocaleDateString()
//               : "No due date"}
//           </p>

//           <button onClick={() => onDeleteTask(task._id)}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TaskList;

//edit button k bad
// import { useState } from "react";
// import EditTaskForm from "./EditTaskForm.jsx";

// function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   if (tasks.length === 0) {
//     return <p>No tasks found. Create your first task!</p>;
//   }

//   return (
//     <div>
//       {tasks.map((task) => (
//         <div key={task._id}>
//           {editingTaskId === task._id ? (
//             <EditTaskForm
//               task={task}
//               onUpdateTask={async (id, formData) => {
//                 await onUpdateTask(id, formData);
//                 setEditingTaskId(null);
//               }}
//               onCancel={() => setEditingTaskId(null)}
//             />
//           ) : (
//             <>
//               <h3>{task.title}</h3>
//               <p>{task.description}</p>
//               <p>Status: {task.status}</p>

//               <p>
//                 Due Date:{" "}
//                 {task.dueDate
//                   ? new Date(task.dueDate).toLocaleDateString()
//                   : "No due date"}
//               </p>

//               <button onClick={() => setEditingTaskId(task._id)}>Edit</button>

//               <button onClick={() => onDeleteTask(task._id)}>Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TaskList;


//after css

import { useState } from "react";
import EditTaskForm from "./EditTaskForm.jsx";
import "./TaskList.css";

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks found. Create your first task!</p>
      </div>
    );
  }

  const formatStatus = (status) => {
    if (status === "in-progress") return "In Progress";

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return "No due date";

    return new Date(dueDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-card" key={task._id}>
          {editingTaskId === task._id ? (
            <EditTaskForm
              task={task}
              onUpdateTask={async (id, formData) => {
                const success = await onUpdateTask(id, formData);

                if (success !== false) {
                  setEditingTaskId(null);
                }

                return success;
              }}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <>
              <div className="task-card-header">
                <h3 className="task-title">{task.title}</h3>

                <span
                  className={`task-status task-status-${task.status}`}
                >
                  {formatStatus(task.status)}
                </span>
              </div>

              <p className="task-description">
                {task.description || "No description provided."}
              </p>

              <div className="task-card-footer">
                <div className="task-due-date">
                  <span className="task-due-label">Due date</span>
                  <span className="task-due-value">
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className="task-edit-button"
                    type="button"
                    onClick={() => setEditingTaskId(task._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="task-delete-button"
                    type="button"
                    onClick={() => onDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}

export default TaskList;
