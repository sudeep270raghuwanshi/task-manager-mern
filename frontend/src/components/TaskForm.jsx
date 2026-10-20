
import { useState } from "react";

function TaskForm({ onCreateTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateTask(formData, () => {
      setFormData({
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
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
          setFormData({
            ...formData,
            status: e.target.value,
          })
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
          setFormData({
            ...formData,
            dueDate: e.target.value,
          })
        }
      />

      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
