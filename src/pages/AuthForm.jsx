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
    role: "client" // Default role for signup
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

    // Store values correctly from destructured variables
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);  // <-- store name here

    console.log("Login Success:");
    console.log("Email:", email);
    console.log("Role:", role);
    console.log("Token:", token);
    console.log("Name:", name);

    navigate("/discover");
  } catch (err) {
    console.error("Login failed:", err.response?.data?.msg || err.message);
    alert("Login failed");
  }
};


const handleSignup = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword)
    return alert("Passwords do not match");

  try {
    const res = await axios.post("https://books-backend-new.onrender.com/api/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });

    const { token, role, email, name } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);  // <-- add this

    console.log("Signup Success:");
    console.log("Email:", email);
    console.log("Role:", role);
    console.log("Token:", token);
    console.log("Name:", name);

    navigate("/discover");
  } catch (err) {
    console.error("Signup failed:", err.response?.data?.msg || err.message);
    alert("Signup failed");
  }
};


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://books-backend-new.onrender.com/api/auth/forgot-password", {
        email: formData.email
      });
      alert("Password reset link sent");
    } catch (err) {
      console.error("Password reset failed:", err.response?.data?.msg || err.message);
      alert("Failed to send reset link");
    }
  };

  return (
    <div className="bg-black from-yellow-400 via-pink-500 to-red-500 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">
        {activeForm === "login" && (
          <form onSubmit={handleLogin}>
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200">
              Log In
            </button>
            <p className="text-center text-gray-600 mt-6">
              <button type="button" onClick={() => toggleForm("forgot")} className="text-yellow-500 hover:underline">
                Forgot Password?
              </button>
            </p>
            <p className="text-center text-gray-600 mt-6">
              Don’t have an account?{" "}
              <button type="button" onClick={() => toggleForm("signup")} className="text-yellow-500 hover:underline">
                Sign Up
              </button>
            </p>
          </form>
        )}

        {activeForm === "signup" && (
          <form onSubmit={handleSignup}>
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <select
              name="role"
              className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleChange}
              value={formData.role}
              required
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200">
              Sign Up
            </button>
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <button type="button" onClick={() => toggleForm("login")} className="text-yellow-500 hover:underline">
                Log In
              </button>
            </p>
          </form>
        )}

        {activeForm === "forgot" && (
          <form onSubmit={handleForgotPassword}>
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button type="submit" className="w-full bg-yellow-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200">
              Reset Password
            </button>
            <p className="text-center text-gray-600 mt-6">
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
