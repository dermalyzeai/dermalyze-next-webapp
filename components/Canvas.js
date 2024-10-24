import React, { useRef, useEffect } from 'react';

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasCtxRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        let ctx = canvasCtxRef.current; // Assigning to a temp variable
        // ctx.beginPath();
        // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        // ctx.stroke();
      }
  }, []);

  return (
    <canvas className="col-lg-3" id="canvas" style={{ border: '1px solid grey', height: '-webkit-fill-available', width: 'auto' }} ref={canvasRef} height={height} width={width} />
  );
}

Canvas.defaultProps = {
  width: 224,
  height: 224
};

export default Canvas;
