import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro, por ahora simulamos un registro exitoso
    console.log('Registration attempted with:', formData);
    
    // Para propósitos de demostración, simplemente navegamos al login
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form-container">
          <div className="register-header">
            <h1>Crear cuenta en</h1>
            <h1 className="app-title">CapacitApp</h1>
          </div>
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Miguel Villarreal"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="demo@gmail.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••"
                rightElement={
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    className="password-toggle"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                }
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <Input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••"
              />
            </div>
            
            <Button type="submit" variant="primary" fullWidth>
              REGISTRARME
            </Button>
            
            <div className="login-prompt">
              <span>¿Ya tienes una cuenta? </span>
              <Link to="/login" className="login-link">
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;