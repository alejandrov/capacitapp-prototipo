import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import "./LoginForm.css";

const LoginForm = ({ onSubmit, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="login-form-container">
      <div className="login-header">
        <h1>Bienvenido a</h1>
        <h1 className="app-title">CapacitApp</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="empleado@gmail.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••"
          />
        </div>

        <div className="login-actions">
          <div className="version-forgot-password-container">
            <span className="version-text">v. 10 4 12pm</span>
            <a href="/forgot-password" className="forgot-password">
              Olvidé mi contraseña
            </a>
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "CARGANDO..." : "LOGIN"}
        </Button>

        {error && <div className="login-error">{error}</div>}

        <div className="register-prompt">
          <span>No tienes una cuenta? </span>
          <Link to="/register" className="register-link">
            Crea una
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
