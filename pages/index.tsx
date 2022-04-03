import type { NextPage } from "next";
import React from "react";
import dummyGameSate from "../dummyData/dummyGameState.json";

const Home: NextPage = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const context = canvasRef?.current?.getContext("2d");
  const [canvasLoaded, setCanvasLoaded] = React.useState(false);

  const animFrameReq = React.useRef<number | null>(null);

  const dragStart = React.useRef<[number, number]>([0, 0]);
  const isDragging = React.useRef<boolean>(false);
  const currentMouseCoords = React.useRef<[number, number]>([0, 0]);
  const globalXOffset = React.useRef<number>(0);
  const globalYOffset = React.useRef<number>(0);
  const uncommitedGlobalXOffset = React.useRef<number>(0);
  const uncommitedGlobalYOffset = React.useRef<number>(0);

  const handleMouseDown = (e: MouseEvent) => {
    dragStart.current = [e.pageX, e.pageY];
    isDragging.current = true;
  };

  const handleMouseUp = (_e: MouseEvent) => {
    isDragging.current = false;
    globalXOffset.current += uncommitedGlobalXOffset.current;
    globalYOffset.current += uncommitedGlobalYOffset.current;
    uncommitedGlobalXOffset.current = 0;
    uncommitedGlobalYOffset.current = 0;
    dragStart.current = [0, 0];
  };

  const draw = () => {
    if (isDragging.current) {
      uncommitedGlobalXOffset.current =
        currentMouseCoords.current[0] - dragStart.current[0];
      uncommitedGlobalYOffset.current =
        currentMouseCoords.current[1] - dragStart.current[1];
    }

    if (context) {
      context.clearRect(0, 0, 1000, 1000);
      context.strokeStyle = "white";
      dummyGameSate.stars.forEach((star) => {
        context.beginPath();
        context.arc(
          (star.x + 5000) / 3 +
            globalXOffset.current +
            uncommitedGlobalXOffset.current,
          (star.y + 5000) / 3 +
            globalYOffset.current +
            uncommitedGlobalYOffset.current,
          star.radius,
          0,
          2 * Math.PI
        );
        context.stroke();
        context.closePath();
      });
    }
    animFrameReq.current = window.requestAnimationFrame(draw);
  };

  React.useEffect(() => {
    setCanvasLoaded(true);
    document.onmousemove = (e: MouseEvent) => {
      currentMouseCoords.current = [e.pageX, e.pageY];
    };
  }, []);

  React.useEffect(() => {
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
        height={1000}
        width={1000}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default Home;
