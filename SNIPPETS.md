# 🚀 Quick Code Snippets Reference

Quick copy-paste snippets for common React patterns.

## 📋 **Component Patterns**

### **Simple State Management**
```jsx
// TodoDisplay.jsx - Basic counter with state
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### **Data Fetching with Custom Hook**
```jsx
// ListPosts.jsx - API data fetching
import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";

export default function DataList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, value: data } = useFetch(
    "https://api.example.com/data",
    {},
    []
  );

  const filteredData = useMemo(() => {
    return data?.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [data, searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {filteredData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### **Form Handling**
```jsx
// PostCreator.jsx - Form with validation
import { useState } from "react";
import useForm from "../hooks/useForm";

export default function Form() {
  const { formData, handleInputChange, handleReset } = useForm({
    title: "",
    body: "",
    userId: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.body) {
      // Submit form data
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <textarea
        name="body"
        value={formData.body}
        onChange={handleInputChange}
        placeholder="Content"
        required
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
}
```

## 🔧 **Custom Hooks**

### **useFetch Hook**
```javascript
// useFetch.js - API data fetching
import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

export default function useFetch(url, options = {}, dependencies = []) {
  return useAsync(() => {
    if (!url) return Promise.resolve(null);
    
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
}
```

### **useForm Hook**
```javascript
// useForm.js - Form state management
import { useState } from "react";

export const INITIAL_FORM_DATA = {
  title: "",
  body: "",
  userId: 1,
  category: "general"
};

export default function useForm(initialData = INITIAL_FORM_DATA) {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  return {
    formData,
    handleInputChange,
    handleReset
  };
}
```

### **useAsync Hook**
```javascript
// useAsync.js - Generic async operations
import { useState, useEffect } from "react";

export default function useAsync(asyncFunction, dependencies = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setValue(null);

    asyncFunction()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  return { loading, error, value };
}
```

## 🎨 **CSS Patterns**

### **Component-Scoped CSS**
```css
/* ComponentName.css */
.component-name {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.component-name h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .component-name {
    padding: 1.5rem;
  }
}
```

### **Button Styles**
```css
/* Global button styles */
button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

button:hover {
  background: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

### **Loading Spinner**
```css
/* LoadingSpinner.css */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: #3498db;
  font-weight: 500;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## 📁 **Folder Structure Template**

```bash
# Create component folder structure
mkdir ComponentName
cd ComponentName

# Create component files
touch ComponentName.jsx
touch ComponentName.css
touch index.js

# index.js content
echo "export { default } from './ComponentName';" > index.js
```

## 🔄 **Import Patterns**

### **Component Imports**
```javascript
// Clean imports using index.js
import TodoDisplay from './components/TodoDisplay';
import ListPosts from './components/ListPosts';
import PostCreator from './components/PostCreator';
```

### **Hook Imports**
```javascript
// Custom hooks
import useFetch from './hooks/useFetch';
import useForm from './hooks/useForm';
import useAsync from './hooks/useAsync';
```

### **CSS Imports**
```javascript
// Component-scoped CSS
import './ComponentName.css';
```

## 🚀 **Quick Start Commands**

```bash
# Copy component to your project
cp -r src/components/TodoDisplay/ your-project/src/components/

# Copy hooks
cp src/hooks/useFetch.js your-project/src/hooks/
cp src/hooks/useForm.js your-project/src/hooks/

# Update imports in your project
# Then customize as needed
```

---

**💡 Tip**: Bookmark this file for quick access during development!
