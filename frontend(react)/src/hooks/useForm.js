import { useState } from 'react';

// Initial form data constants
export const INITIAL_FORM_DATA = {
  title: '',
  body: '',
  userId: 1,
  category: 'general'
};

export const INITIAL_TODO_FORM = {
  title: '',
  completed: false,
  userId: 1
};

export const INITIAL_USER_FORM = {
  name: '',
  email: '',
  phone: ''
};

export default function useForm(initialData = INITIAL_FORM_DATA) {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  const updateField = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const isFormValid = () => {
    // Basic validation - can be customized per form
    return Object.values(formData).every(value => 
      value !== '' && value !== null && value !== undefined
    );
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleReset,
    updateField,
    isFormValid
  };
}
