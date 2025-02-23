import React, { useEffect, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';

const CircuitLines = () => {
  const { theme } = useSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes: { x: number; y: number; connections: number[] }[] = [];
    const numNodes = 50;

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: []
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const numConnections = 2 + Math.floor(Math.random() * 3);
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * numNodes);
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target);
        }
      }
    });

    let offset = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -offset;
          ctx.stroke();
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fill();
      });

      offset += 0.5;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div 
      className="circuit-lines" 
      style={{
        background: `
          linear-gradient(90deg, var(--accent-secondary) 1px, transparent 1px) 0 0 / 50px 50px,
          linear-gradient(0deg, var(--accent-secondary) 1px, transparent 1px) 0 0 / 50px 50px
        `
      }}
    >
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />
    </div>
  );
};

export default CircuitLines;