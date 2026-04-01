import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        login(response.data.token);
        navigate("/dashboard");
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="glass-card"
      style={{ maxWidth: "400px", margin: "4rem auto", padding: "2.5rem" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            background: "rgba(99, 102, 241, 0.1)",
            padding: "1rem",
            borderRadius: "50%",
          }}
        >
          <LogIn style={{ color: "var(--accent-primary)" }} size={32} />
        </div>
      </div>
      <h2
        className="text-center mb-4"
        style={{ fontSize: "1.5rem", fontWeight: "600" }}
      >
        Welcome Back
      </h2>
      <p
        className="text-center mb-4"
        style={{ color: "var(--text-secondary)" }}
      >
        Log in to manage your tasks
      </p>

      {successMessage && (
        <div
          style={{
            color: "var(--success)",
            background: "rgba(16, 185, 129, 0.1)",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            fontSize: "0.875rem",
          }}
        >
          {successMessage}
        </div>
      )}
      {error && (
        <div
          style={{
            color: "var(--danger)",
            background: "rgba(239, 68, 68, 0.1)",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            fontSize: "0.875rem",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isLoading}
          style={{ padding: "0.875rem", opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div
        className="text-center mt-6"
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          marginTop: "1.5rem",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{ color: "var(--accent-primary)", fontWeight: "600" }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
