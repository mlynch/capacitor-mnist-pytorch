import { useCallback, useEffect, useRef, useState } from "react";
import { AppStore } from "../store";
import "./DrawCanvas.css";

interface Props {
  clear: boolean;
}

export default function DrawCanvas({ clear }: Props) {
  const [drawing, setDrawing] = useState(false);
  const [prev, setPrev] = useState<number[] | null>(null);
  const [canvasSize, setCanvasSize] = useState<number[] | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setCanvasSize([window.innerWidth, window.innerHeight]);
    function handleResize(e: UIEvent) {
      console.log('Resizing canvas', window.innerWidth, window.innerHeight);
      setCanvasSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setCtx(ctx);
      AppStore.update(s => {
        (s as any).ctx = ctx;
        return s;
      });
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (clear && ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      AppStore.update(s => {
        s.clear = false;
        return s;
      });
    }
  }, [clear, ctx]);

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
    e.preventDefault();
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setPrev(null);
    setDrawing(false);
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setPrev(null);
    setDrawing(false);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (drawing && prev && ctx) {
        ctx.beginPath();
        ctx.lineWidth = 16;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
        ctx.moveTo(prev[0], prev[1]);
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
        // ctx.closePath();
        setPrev([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
      }
      e.preventDefault();
    },
    [drawing, prev, ctx]
  );

  if (canvasSize) {
    return (
      <canvas
        ref={canvasRef}
        style={{
          width: canvasSize[0],
          height: canvasSize[1]
        }}
        width={canvasSize[0]}
        height={canvasSize[1]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerOut={handlePointerLeave}
      ></canvas>
    );
  }

  return null;
}
