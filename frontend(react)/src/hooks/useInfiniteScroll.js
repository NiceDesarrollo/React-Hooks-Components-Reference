import { useState, useEffect, useCallback, useRef } from 'react';
import useFetch from './useFetch';

const useInfiniteScroll = (url, options = {}) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  
  const { loading, error, value } = useFetch(
    `${url}${url.includes('?') ? '&' : '?'}_page=${page}&_limit=${options.limit || 10}`,
    options.fetchOptions || {},
    [page]
  );

  // Handle successful data fetch
  useEffect(() => {
    if (value && !loading) {
      if (value.length === 0) {
        setHasMore(false);
        return;
      }
      setItems(prevItems => [...prevItems, ...value]);
    }
  }, [value, loading]);

  // Intersection Observer for infinite scroll
  const lastItemRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const refresh = useCallback(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, []);

  return {
    items,
    loading,
    error,
    hasMore,
    lastItemRef,
    refresh
  };
};

export default useInfiniteScroll;
