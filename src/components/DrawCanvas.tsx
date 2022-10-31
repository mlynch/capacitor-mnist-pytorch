import { useCallback, useEffect, useRef, useState } from "react";
import "./DrawCanvas.css";

export default function DrawCanvas() {
  const [drawing, setDrawing] = useState(false);
  const [prev, setPrev] = useState<number[] | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (ctx) {
      console.log(ctx.canvas.offsetLeft, ctx.canvas.offsetTop);
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
  }, [ctx]);
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setPrev([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
    setDrawing(true);
  }, []);
  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setPrev(null);
    setDrawing(false);
  }, []);
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (drawing && prev && ctx) {
        console.log("Drawing");
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000000";
        ctx.moveTo(prev[0], prev[1]);
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        console.log(
          prev[0],
          prev[1],
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        );
        ctx.stroke();
        // ctx.closePath();
        setPrev([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
      }
    },
    [drawing, prev, ctx]
  );
  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    ></canvas>
  );
}
