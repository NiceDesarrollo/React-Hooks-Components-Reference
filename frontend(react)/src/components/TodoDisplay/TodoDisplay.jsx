import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./TodoDisplay.css";

export default function TodoDisplay() {
  const [id, setId] = useState(1);
  const { loading, error, value } = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {},
    [id]
  );

  return (
    <div className="todo-display">
      <h2>Todo Counter</h2>
      
      <div className="counter-section">
        <div className="id-display">
          <span>Current ID: </span>
          <span className="id-value">{id}</span>
        </div>
        
        <button 
          onClick={() => setId((currentId) => currentId + 1)}
          className="increment-btn"
        >
          Increment ID
        </button>
      </div>

      <div className="data-section">
        <div className="status">
          <strong>Loading:</strong> {loading.toString()}
        </div>
        
        {error && (
          <div className="error">
            <strong>Error:</strong>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        
        {value && (
          <div className="todo-data">
            <strong>Todo Data:</strong>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
