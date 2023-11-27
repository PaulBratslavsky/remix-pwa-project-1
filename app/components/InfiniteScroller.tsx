import React, { useState, useEffect } from 'react';

export default function InfiniteScroller({ children }) {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // Add Listeners to scroll and client resize
  useEffect(() => {
    const scrollListener = () => {
      setClientHeight(window.innerHeight);
      setScrollPosition(window.scrollY);
    };

    // Avoid running during SSR
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollListener);
    }

    // Clean up
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", scrollListener);
      }
    };
  }, []);

  return (
    <div className='h-auto'>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '10px',
          backgroundColor: 'lightgray',
          padding: '5px',
        }}
      >
        Scroll Position: {scrollPosition}
        Scroll Height: {clientHeight}
      </div>
    </div>
  );
}
