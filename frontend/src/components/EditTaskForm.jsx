
// import { useState } from "react";

// function EditTaskForm({ task, onUpdateTask, onCancel }) {
//   const [formData, setFormData] = useState({
//     title: task.title || "",
//     description: task.description || "",
//     status: task.status || "pending",
//     dueDate: task.dueDate
//       ? task.dueDate.slice(0, 10)
//       : "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdateTask(task._id, formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Edit Task</h3>

//       <input
//         type="text"
//         placeholder="Task title"
//         value={formData.title}
//         onChange={(e) =>
//           setFormData({ ...formData, title: e.target.value })
//         }
//         required
//       />

//       <textarea
//         placeholder="Task description"
//         value={formData.description}
//         onChange={(e) =>
//           setFormData({
//             ...formData,
//             description: e.target.value,
//           })
//         }
//       />

//       <select
//         value={formData.status}
//         onChange={(e) =>
//           setFormData({ ...formData, status: e.target.value })
//         }
//       >
//         <option value="pending">Pending</option>
//         <option value="in-progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>

//       <input
//         type="date"
//         value={formData.dueDate}
//         onChange={(e) =>
//           setFormData({ ...formData, dueDate: e.target.value })
//         }
//       />

//       <button type="submit">Save Changes</button>
//       <button type="button" onClick={onCancel}>
//         Cancel
//       </button>
//     </form>
//   );
// }

// export default EditTaskForm;


//after css 

import { useState } from "react";
import "./EditTaskForm.css";

function EditTaskForm({ task, onUpdateTask, onCancel }) {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "pending",
    dueDate: task.dueDate
      ? task.dueDate.slice(0, 10)
      : "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(task._id, formData);
  };

  return (
    <form
      className="edit-task-form"
      onSubmit={handleSubmit}
    >
      <div className="edit-task-heading">
        <h3>Edit Task</h3>
        <p>Update your task details below.</p>
      </div>

      <div className="edit-task-group">
        <label htmlFor="edit-title">Task title</label>
        <input
          id="edit-title"
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="edit-task-group">
        <label htmlFor="edit-description">Description</label>
        <textarea
          id="edit-description"
          name="description"
          placeholder="Describe your task"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="edit-task-group">
        <label htmlFor="edit-status">Task status</label>
        <select
          id="edit-status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="edit-task-group">
        <label htmlFor="edit-due-date">Due date</label>
        <input
          id="edit-due-date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="edit-task-actions">
        <button
          className="edit-save-button"
          type="submit"
        >
          Save Changes
        </button>

        <button
          className="edit-cancel-button"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
