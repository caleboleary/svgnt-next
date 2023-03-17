import { NextPage } from "next";
import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import dummyGameState from "../src/dummyData/dummyGameState.json";

import drawStar from "../src/drawers/drawStar";
import drawStarlight from "../src/drawers/drawStarlight";

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  const animFrameReq = useRef<number | null>(null);

  const dragStart = useRef<[number, number]>([0, 0]);
  const isDragging = useRef<boolean>(false);
  const currentMouseCoords = useRef<[number, number]>([0, 0]);
  const globalXOffset = useRef<number>(0);
  const globalYOffset = useRef<number>(0);
  const uncommittedGlobalXOffset = useRef<number>(0);
  const uncommittedGlobalYOffset = useRef<number>(0);
  const zoom = useRef<number>(1);

  const handleMouseDown = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    dragStart.current = [e.pageX, e.pageY];
    isDragging.current = true;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    const newZoom = zoom.current - e.deltaY * 0.001;
    zoom.current = Math.max(0.1, Math.min(5, newZoom));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    globalXOffset.current += uncommittedGlobalXOffset.current;
    globalYOffset.current += uncommittedGlobalYOffset.current;
    uncommittedGlobalXOffset.current = 0;
    uncommittedGlobalYOffset.current = 0;
    dragStart.current = [0, 0];
  };

  const draw = () => {
    const context = canvasRef.current?.getContext("2d");

    if (isDragging.current) {
      uncommittedGlobalXOffset.current =
        (currentMouseCoords.current[0] - dragStart.current[0]) / zoom.current;
      uncommittedGlobalYOffset.current =
        (currentMouseCoords.current[1] - dragStart.current[1]) / zoom.current;
    }

    if (context && canvasRef.current) {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      dummyGameState.stars.forEach((star) => {
        context.globalCompositeOperation = "multiply";

        drawStarlight(
          star,
          context,
          globalXOffset.current,
          uncommittedGlobalXOffset.current,
          globalYOffset.current,
          uncommittedGlobalYOffset.current,
          zoom.current
        );
      });
      context.globalCompositeOperation = "source-over";

      dummyGameState.stars.forEach((star) => {
        drawStar(
          star,
          context,
          globalXOffset.current,
          uncommittedGlobalXOffset.current,
          globalYOffset.current,
          uncommittedGlobalYOffset.current,
          zoom.current
        );
      });
    }
    animFrameReq.current = window.requestAnimationFrame(draw);
  };

  useEffect(() => {
    setCanvasLoaded(true);
    document.onmousemove = (e: MouseEvent) => {
      currentMouseCoords.current = [e.pageX, e.pageY];
    };
  }, []);

  useEffect(() => {
    if (canvasLoaded) {
      animFrameReq.current = window.requestAnimationFrame(draw);
    }
    return () => {
      animFrameReq.current && window.cancelAnimationFrame(animFrameReq.current);
    };
  }, [canvasLoaded]);

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
    </div>
  );
};

export default Home;
