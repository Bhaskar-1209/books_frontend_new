import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthForm() {
  const [activeForm, setActiveForm] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client"
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleForm = (form) => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "client"
    });
    setActiveForm(form);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://books-backend-new.onrender.com/api/auth/login", {
        email: formData.email,
        password: formData.password
      });

      const { token, role, email, name } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      console.log("Login Success:", res.data);
      navigate("/discover");
    } catch (err) {
      console.error("Login failed:", err.response?.data?.msg || err.message);
      alert("Login failed: " + (err.response?.data?.msg || err.message));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post("https://books-backend-new.onrender.com/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      const { token, role, email, name } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      console.log("Signup Success:", res.data);
      navigate("/discover");
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.msg || err.message);
      alert("Signup failed: " + (err.response?.data?.msg || err.message));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://books-backend-new.onrender.com/api/auth/forgot-password", {
        email: formData.email
      });
      alert("Password reset link sent to your email.");
    } catch (err) {
      console.error("Password reset failed:", err.response?.data?.msg || err.message);
      alert("Reset failed: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="bg-black flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">
        {activeForm === "login" && (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-6 p-3 border rounded-lg"
              required
            />
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600">
              Log In
            </button>
            <p className="text-center mt-4">
              <button type="button" onClick={() => toggleForm("forgot")} className="text-yellow-500 hover:underline">
                Forgot Password?
              </button>
            </p>
            <p className="text-center mt-2 text-sm">
              Don’t have an account?{" "}
              <button type="button" onClick={() => toggleForm("signup")} className="text-yellow-500 hover:underline">
                Sign Up
              </button>
            </p>
          </form>
        )}

        {activeForm === "signup" && (
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mb-6 p-3 border rounded-lg"
              required
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600">
              Sign Up
            </button>
            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <button type="button" onClick={() => toggleForm("login")} className="text-yellow-500 hover:underline">
                Log In
              </button>
            </p>
          </form>
        )}

        {activeForm === "forgot" && (
          <form onSubmit={handleForgotPassword}>
            <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-6 p-3 border rounded-lg"
              required
            />
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600">
              Reset Password
            </button>
            <p className="text-center mt-4 text-sm">
              Remember your password?{" "}
              <button type="button" onClick={() => toggleForm("login")} className="text-yellow-500 hover:underline">
                Log In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
