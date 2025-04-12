import React from 'react';
import { 
  Trash2 as TrashIcon, 
  Plus as PlusIcon 
} from 'lucide-react';
import ModuleItem from './ModuleItem';

const CourseModulesList = ({ modules, onModuleChange, onShowTestModal }) => {
  // Agregar nuevo módulo
  const handleAddModule = () => {
    const newModule = {
      id: `module-${Date.now()}`,
      title: '',
      description: '',
      mediaUrl: '',
      isTest: false
    };
    
    const updatedModules = [...modules, newModule];
    onModuleChange(updatedModules);
  };

  // Eliminar un módulo
  const handleDeleteModule = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este módulo?')) {
      const updatedModules = [...modules];
      updatedModules.splice(index, 1);
      onModuleChange(updatedModules);
    }
  };

  // Actualizar un campo de un módulo
  const handleModuleUpdate = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value
    };
    onModuleChange(updatedModules);
  };

  // Cambiar tipo de módulo (contenido/prueba)
  const handleIsTestChange = (index, isTest) => {
    const updatedModules = [...modules];
    updatedModules[index] = {
      ...updatedModules[index],
      isTest
    };
    
    if (isTest) {
      // Si este módulo es un test, pero ya hay otro test, preguntar
      const existingTestIndex = modules.findIndex(module => module.isTest);
      if (existingTestIndex !== -1 && existingTestIndex !== index) {
        if (window.confirm('Ya existe un módulo de prueba. ¿Desea convertir este módulo en prueba y revertir el otro a módulo normal?')) {
          updatedModules[existingTestIndex] = {
            ...updatedModules[existingTestIndex],
            isTest: false
          };
        } else {
          return; // No hacer el cambio si el usuario cancela
        }
      }
    }
    
    onModuleChange(updatedModules);
  };

  return (
    <div>
      <h3 style={{ 
        fontSize: '18px', 
        color: '#1a1060', 
        marginBottom: '20px',
        fontWeight: '600' 
      }}>
        Módulos del Curso
      </h3>
      
      {/* Lista de módulos */}
      {modules.map((module, index) => (
        <ModuleItem 
          key={module.id}
          module={module}
          index={index}
          onUpdate={(field, value) => handleModuleUpdate(index, field, value)}
          onDelete={() => handleDeleteModule(index)}
          onTypeChange={(isTest) => handleIsTestChange(index, isTest)}
          onConfigureTest={onShowTestModal}
        />
      ))}
      
      {/* Botón para agregar un nuevo módulo */}
      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          onClick={handleAddModule}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: 'white',
            color: '#1a1060',
            border: '1px dashed #1a1060',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          <PlusIcon size={18} />
          Agregar Nuevo Módulo
        </button>
      </div>
    </div>
  );
};

export default CourseModulesList;