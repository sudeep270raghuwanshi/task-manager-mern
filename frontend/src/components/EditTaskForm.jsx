
import { useState } from "react";

function EditTaskForm({ task, onUpdateTask, onCancel }) {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "pending",
    dueDate: task.dueDate
      ? task.dueDate.slice(0, 10)
      : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(task._id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Task</h3>

      <input
        type="text"
        placeholder="Task title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />

      <textarea
        placeholder="Task description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

      <select
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) =>
          setFormData({ ...formData, dueDate: e.target.value })
        }
      />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditTaskForm;
