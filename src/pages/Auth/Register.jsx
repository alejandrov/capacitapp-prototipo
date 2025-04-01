import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeNumber: '',
    fullName: '',
    curp: '',
    plant: '',
    company: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log('Registration attempted with:', formData);
    
    // Para propósitos de demostración, navegamos al login
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form-container">
          <div className="register-header">
            <div className="back-button">
              <Link to="/login">←</Link>
            </div>
            <h1 className="create-account-title">Crea una cuenta</h1>
            <p className="verification-text">
              Al momento de dar click en iniciar, enviaremos un código de verificación para confirmar sus datos.
            </p>
          </div>
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="employeeNumber">Número de empleado</label>
              <Input
                type="text"
                id="employeeNumber"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
                placeholder="7555"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo</label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Juan Pérez López"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="curp">CURP</label>
              <Input
                type="text"
                id="curp"
                name="curp"
                value={formData.curp}
                onChange={handleChange}
                placeholder="PELJ880101HDFRNL09"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="plant">Planta</label>
              <Input
                type="text"
                id="plant"
                name="plant"
                value={formData.plant}
                onChange={handleChange}
                placeholder="Planta Industrial Norte"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Empresa</label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Industrias Mexicanas S.A. de C.V."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan.perez@gmail.com"
              />
            </div>
            
            <Button type="submit" variant="primary" fullWidth className="iniciar-button">
              INICIAR
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;