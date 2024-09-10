import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ItemList from './ItemListComponet';
import debounce from 'lodash/debounce'; 


const ITEM_HEIGHT = 35;  
const VISIBLE_COUNT = 20; 

const VirtualizedList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://react-virutalization-backend-1.onrender.com/api/items', {
        params: {
          start: items.length,
          limit: 100
        }
      });
      const newItems = response.data;
      setItems((prevItems) => [...prevItems, ...newItems]);
      if (newItems.length < 100) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    setLoading(false);
  }, [items.length]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleScroll = debounce(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }

    const scrollBottom = containerRef.current.scrollHeight - containerRef.current.clientHeight;
    if (containerRef.current.scrollTop >= scrollBottom - ITEM_HEIGHT * 2 && hasMore && !loading) {
      fetchItems();
    }
  }, 50);

  const visibleItems = Math.ceil(containerRef.current ? containerRef.current.clientHeight / ITEM_HEIGHT : VISIBLE_COUNT);
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - VISIBLE_COUNT);
  const endIndex = Math.min(items.length, startIndex + visibleItems + VISIBLE_COUNT * 2);

  return (
    <div
      ref={containerRef}
      style={{
        height: '800px',
        overflowY: 'auto',
        position: 'relative',
        // border: '1px solid #ddd'
      }}
      onScroll={handleScroll}
    >
      <ItemList
        items={items}
        startIndex={startIndex}
        endIndex={endIndex}
        scrollTop={scrollTop}
      />
      {loading && <div style={{ textAlign: 'center', padding: '10px' }}>Loading...</div>}
    </div>
  );
};

export default VirtualizedList;