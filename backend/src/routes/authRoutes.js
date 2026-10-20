// import express from "express";
// import { registerUser } from "../controllers/authControllers.js";

// const router = express.Router();

// router.post("/register", registerUser);

// export default router;


import express from "express";

import {
    registerUser,
    loginUser
} from "../controllers/authControllers.js";

import {
    validateRegister
} from "../middleware/validateRegister.js";

const router = express.Router();

// Registration: validate first, then register
router.post("/register", validateRegister, registerUser);

// Login
router.post("/login", loginUser);

export default router;
