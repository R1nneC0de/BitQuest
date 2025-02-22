import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const columns = Math.floor(width / 20); // One character every 20px

    const createMatrixColumn = () => {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${Math.random() * width}px`;
      column.style.animationDuration = `${2 + Math.random() * 3}s`;
      column.style.color = `rgba(0, ${155 + Math.random() * 100}, 0, ${0.5 + Math.random() * 0.5})`;

      // Create binary characters
      for (let i = 0; i < 20; i++) {
        const char = document.createElement('span');
        char.textContent = Math.random() > 0.5 ? '1' : '0';
        column.appendChild(char);
      }

      container.appendChild(column);

      setTimeout(() => {
        container.removeChild(column);
      }, 5000);
    };

    const interval = setInterval(() => {
      for (let i = 0; i < columns / 10; i++) {
        createMatrixColumn();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="matrix-background" />;
};

export default MatrixBackground;