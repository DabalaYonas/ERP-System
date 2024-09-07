import { Button } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

const SignatureCanvas = React.forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
  }, []);

  const startDrawing = (event) => {
    const { offsetX, offsetY } = getEventPosition(event);
    setLastPosition({ x: offsetX, y: offsetY });
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getEventPosition(event);
    const context = canvasRef.current.getContext('2d');

    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.quadraticCurveTo(lastPosition.x, lastPosition.y, offsetX, offsetY);
    context.stroke();

    setLastPosition({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  React.useImperativeHandle(ref, () => ({
        
    clearCanvas() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    },

    getSignature() {
        const canvas = canvasRef.current;
        return canvas.toDataURL("image/png")
    },
  }));

  const getEventPosition = (event) => {
    if (event.touches) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        offsetX: event.touches[0].clientX - rect.left,
        offsetY: event.touches[0].clientY - rect.top,
      };
    }
    return {
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
    };
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={470}
        height={200}
        style={{ border: '1px solid #000', touchAction: 'none' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
});

export default SignatureCanvas;