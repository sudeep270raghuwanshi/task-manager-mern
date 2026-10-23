
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       setLoading(true);

//       const response = await api.post(
//         "/auth/register",
//         formData
//       );

//       setMessage(
//         response.data.message || "Registration successful!"
//       );

//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });

//       setTimeout(() => navigate("/login"), 1000);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Account</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {message && <p style={{ color: "green" }}>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter your name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <br /><br />

//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <br /><br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <br /><br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>

//       <p>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// }

// export default Register;




//after css 

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/register",
        formData
      );

      setMessage(
        response.data.message || "Registration successful!"
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-brand">
          <div className="register-logo">T</div>
          <span>TaskMonitor</span>
        </div>

        <div className="register-heading">
          <h1>Create your account</h1>
          <p>
            Get started and organize your tasks in one place.
          </p>
        </div>

        {error && (
          <p className="register-error" role="alert">
            {error}
          </p>
        )}

        {message && (
          <p className="register-success" role="status">
            {message}
          </p>
        )}

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          <div className="register-form-group">
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="register-email">
              Email address
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </section>

      <p className="register-bottom-text">
        Simple tasks. Better productivity.
      </p>
    </main>
  );
}

export default Register;
