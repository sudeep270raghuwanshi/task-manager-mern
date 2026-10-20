
import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        if (title.trim().length > 150) {
            return res.status(400).json({
                message: "Title cannot exceed 150 characters"
            });
        }

        const task = await Task.create({
            title: title.trim(),
            description,
            status,
            dueDate,
            userId: req.user.userId
        });

        return res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        if (error.name === "ValidationError" ||
            error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid task data"
            });
        }

        return res.status(500).json({
            message: "Failed to create task"
        });
    }
};


// READ ALL TASKS BELONGING TO LOGGED-IN USER
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            count: tasks.length,
            tasks
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};


// UPDATE A TASK
export const updateTask = async (req, res) => {
    try {
        const allowedFields = [
            "title",
            "description",
            "status",
            "dueDate"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (Object.hasOwn(req.body, field)) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Provide at least one valid field to update"
            });
        }

        if (
            Object.hasOwn(updates, "title") &&
            (
                typeof updates.title !== "string" ||
                !updates.title.trim() ||
                updates.title.trim().length > 150
            )
        ) {
            return res.status(400).json({
                message: "Title must be 1–150 characters"
            });
        }

        if (Object.hasOwn(updates, "title")) {
            updates.title = updates.title.trim();
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        ); 

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        if (
            error.name === "ValidationError" ||
            error.name === "CastError"
        ) {
            return res.status(400).json({
                message: "Invalid task data or task ID"
            });
        }

        return res.status(500).json({
            message: "Failed to update task"
        });
    }
};


// DELETE A TASK
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        return res.status(500).json({
            message: "Failed to delete task"
        });
    }
};
