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

import { useState } from "react";
import EditTaskForm from "./EditTaskForm.jsx";

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  if (tasks.length === 0) {
    return <p>No tasks found. Create your first task!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          {editingTaskId === task._id ? (
            <EditTaskForm
              task={task}
              onUpdateTask={async (id, formData) => {
                await onUpdateTask(id, formData);
                setEditingTaskId(null);
              }}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>

              <p>
                Due Date:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </p>

              <button onClick={() => setEditingTaskId(task._id)}>Edit</button>

              <button onClick={() => onDeleteTask(task._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
