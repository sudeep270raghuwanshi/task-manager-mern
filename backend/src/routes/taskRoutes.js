
// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Temporary protected test endpoint
// router.get("/protected", authMiddleware, (req, res) => {
//     res.status(200).json({
//         message: "You accessed a protected route!",
//         user: req.user
//     });
// });

// export default router;


import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} from "../controllers/taskControllers.js";

const router = express.Router();

// All routes below require authentication
router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;

