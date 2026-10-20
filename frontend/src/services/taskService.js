import api from "./api.js";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (formData) => {
  const payload = {
    ...formData,
    dueDate: formData.dueDate || null,
  };

  const response = await api.post("/tasks", payload);

  return response.data.task ?? response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};


export const updateTask = async (id, formData) => {
  const payload = {
    ...formData,
    dueDate: formData.dueDate || null,
  };

  const response = await api.patch(`/tasks/${id}`, payload);

  return response.data.task ?? response.data;
};
