import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeaderSecondary from '../../components/common/PageHeaderSecondary';
import CourseInfoForm from './components/CourseForm/CourseInfoForm';
import CourseModulesList from './components/CourseForm/CourseModulesList';
import TestQuestionsModal from './components/CourseForm/TestQuestionsModal';
import CoursePreview from './components/CourseForm/CoursePreview';

const AddCursoPage = () => {
  const navigate = useNavigate();
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('book');
  const [requiresValidation, setRequiresValidation] = useState(false);

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    moduleDescription: 'Al tomar esta evaluación, los integrantes aprenderán:',
    totalModules: '1',
    requiresValidation: false,
    testQuestions: [
      {
        question: '',
        options: ['', '', ''],
        correctAnswer: 0
      }
    ],
    modules: [
      {
        id: `module-${Date.now()}`,
        title: '',
        description: '',
        mediaUrl: '',
        isTest: false
      }
    ]
  });

  // Manejadores generales
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
    setRequiresValidation(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.title.trim()) {
      alert('El título del curso es obligatorio');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('La descripción del curso es obligatoria');
      return;
    }
    
    // Validar que todos los módulos tengan título y descripción
    const invalidModule = formData.modules.find(
      module => !module.title.trim() || !module.description.trim()
    );
    
    if (invalidModule) {
      alert('Todos los módulos deben tener título y descripción');
      return;
    }
    
    // Validar módulos de prueba si existen
    const testModule = formData.modules.find(module => module.isTest);
    if (testModule) {
      // Verificar que todas las preguntas tengan contenido
      const invalidQuestion = formData.testQuestions.find(
        q => !q.question.trim() || q.options.some(opt => !opt.trim())
      );
      
      if (invalidQuestion) {
        alert('Todas las preguntas y opciones de respuesta deben estar completas');
        return;
      }
    }
    
    // Simulación de creación del curso
    alert('Curso creado exitosamente');
    // Redirigir de vuelta a la lista de cursos
    navigate('/dashboard/ejecutivo/cursos');
  };

  const handleCancel = () => {
    navigate('/dashboard/ejecutivo/cursos');
  };

  // Props para el componente de módulos
  const moduleProps = {
    modules: formData.modules,
    onModuleChange: (updatedModules) => {
      setFormData({
        ...formData,
        modules: updatedModules,
        totalModules: String(updatedModules.length)
      });
    },
    onShowTestModal: () => setShowTestModal(true)
  };

  // Props para el modal de preguntas
  const testModalProps = {
    show: showTestModal,
    onClose: () => setShowTestModal(false),
    questions: formData.testQuestions,
    onQuestionsChange: (updatedQuestions) => {
      setFormData({
        ...formData,
        testQuestions: updatedQuestions
      });
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      paddingBottom: '80px' // Espacio para el menú inferior
    }}>
      {/* Cabecera */}
      <PageHeaderSecondary 
        title="Crear Curso" 
        backUrl="/dashboard/ejecutivo/cursos"
      />
      
      {/* Vista previa del curso */}
      <CoursePreview 
        title={formData.title} 
        description={formData.description}
        icon={selectedIcon}
      />
      
      {/* Formulario de creación */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <form onSubmit={handleSubmit}>
          {/* Información general del curso */}
          <CourseInfoForm 
            formData={formData}
            selectedIcon={selectedIcon}
            requiresValidation={requiresValidation}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onIconSelect={setSelectedIcon}
          />
          
          {/* Módulos del curso */}
          <CourseModulesList {...moduleProps} />
          
          {/* Botones de acción */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: '15px',
            marginTop: '30px'
          }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                color: '#666',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1a1060',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Crear Curso
            </button>
          </div>
        </form>
      </div>
      
      {/* Modal para configurar las preguntas de la prueba */}
      <TestQuestionsModal {...testModalProps} />
    </div>
  );
};

export default AddCursoPage;