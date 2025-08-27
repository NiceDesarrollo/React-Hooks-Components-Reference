import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useForm, { INITIAL_FORM_DATA } from "../../hooks/useForm";
import "./PostCreator.css";

export default function PostCreator() {
  const [postSended, setPostSended] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { formData, handleInputChange, handleReset } = useForm(INITIAL_FORM_DATA);

  // Request logic - only triggers when postSended changes
  const { loading, error, value } = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      body: JSON.stringify(formData),
    },
    [postSended] // Only triggers when postSended changes
  );

  // UI logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.body) {
      setPostSended(true);
      setShowResult(true);
    }
  };

  const handleFormReset = () => {
    handleReset(); // Reset form data
    setShowResult(false); // Hide result without triggering API call
  };

  return (
    <div className="post-section">
      <h2>Create New Post</h2>
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter post title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Content:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Enter post content..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
          >
            <option value={1}>User 1</option>
            <option value={2}>User 2</option>
            <option value={3}>User 3</option>
            <option value={4}>User 4</option>
            <option value={5}>User 5</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="news">News</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading || !formData.title || !formData.body}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button type="button" onClick={handleFormReset} className="reset-btn">
            Reset Form
          </button>
        </div>
      </form>
      
      {showResult && (
        <div className="post-result">
          <h3>Post Creation Result:</h3>
          {loading && <div className="loading-spinner">Creating post...</div>}
          {error && <div className="error-message">Error: {JSON.stringify(error)}</div>}
          {value && (
            <div className="success">
              <h4>Post Created Successfully!</h4>
              <p><strong>ID:</strong> {value.id}</p>
              <p><strong>Title:</strong> {value.title}</p>
              <p><strong>Content:</strong> {value.body}</p>
              <p><strong>User ID:</strong> {value.userId}</p>
              <p><strong>Category:</strong> {formData.category}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
