// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./config/db.js";
// import User from "./models/User.js";

// dotenv.config();
// // const PORT = 9191;
// const PORT = process.env.PORT || 9191;

// connectDB();

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


//deployment started.....

import dotenv from "dotenv";
dotenv.config();
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not configured");
}

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 9191;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
