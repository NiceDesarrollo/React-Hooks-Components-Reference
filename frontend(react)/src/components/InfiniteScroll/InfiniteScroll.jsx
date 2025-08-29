import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './InfiniteScroll.css';

const InfiniteScroll = () => {
  const {
    items,
    loading,
    error,
    hasMore,
    lastItemRef,
    refresh
  } = useInfiniteScroll('https://jsonplaceholder.typicode.com/posts', {
    limit: 10
  });

  if (error) {
    return (
      <div className="infinite-scroll">
        <h2>Infinite Scroll Demo</h2>
        <div className="error-message">
          <p>Error: {error.message || 'Failed to fetch data'}</p>
          <button onClick={refresh} className="refresh-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="infinite-scroll">
      <h2>Infinite Scroll Demo</h2>
      <p className="description">
        Scroll down to load more posts automatically
      </p>
      
      <div className="items-container">
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <div
                key={`${item.id}-${index}`}
                ref={lastItemRef}
                className="item-card"
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="item-id">Post #{item.id}</span>
              </div>
            );
          } else {
            return (
              <div key={`${item.id}-${index}`} className="item-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="item-id">Post #{item.id}</span>
              </div>
            );
          }
        })}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading more posts...</p>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <div className="end-message">
          <p>🎉 You've reached the end! All posts loaded.</p>
          <button onClick={refresh} className="refresh-btn">
            Load Again
          </button>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="empty-state">
          <p>No posts found</p>
          <button onClick={refresh} className="refresh-btn">
            Load Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
