import { useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import "./ListPosts.css";

// Search Bar Component
function SearchBar({ searchTerm, onSearchChange, filteredCount, totalCount }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search posts by title or content..."
        value={searchTerm}
        onChange={onSearchChange}
        className="search-input"
      />
      <span className="search-count">
        {filteredCount} of {totalCount} posts
      </span>
    </div>
  );
}

// Individual Post Card Component
function PostCard({ post, onViewDetails }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <span className="post-id">#{post.id}</span>
      </div>
      <p className="post-body">{post.body}</p>
      <div className="post-footer">
        <span className="post-user">User ID: {post.userId}</span>
        <button
          onClick={() => onViewDetails(post.body)}
          className="view-btn"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

// Posts List Component without filter
function PostsList({ posts, onViewDetails }) {
  if (posts.length === 0) {
    return (
      <div className="no-results">
        No posts available.
      </div>
    );
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

// Search Results Component
function SearchResults({ filteredPosts, searchTerm, onViewDetails }) {
  if (filteredPosts.length === 0) {
    return (
      <div className="no-results">
        {searchTerm
          ? "No posts found matching your search."
          : "No posts available."}
      </div>
    );
  }

  return (
    <div className="posts-container">
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

// Main ListPosts Component
export default function ListPosts() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all posts
  const {
    loading,
    error,
    value: posts,
  } = useFetch("https://jsonplaceholder.typicode.com/posts", {}, []);

  // Filter posts based on search term - memoized for performance
  const filteredPosts = useMemo(() => {
    return (
      posts?.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [posts, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (body) => {
    alert(body);
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return <ErrorMessage error={error} title="Error loading posts" />;
  }

  return (
    <div className="list-section">
      <h2>Posts List</h2>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        filteredCount={filteredPosts.length}
        totalCount={posts?.length || 0}
      />

      {/* Posts List with Search Results */}
      <SearchResults
        filteredPosts={filteredPosts}
        searchTerm={searchTerm}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}
