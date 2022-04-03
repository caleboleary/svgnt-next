import type { NextPage } from "next";
import React, { type MouseEvent as ReactMouseEvent } from "react";
import dummyGameSate from "../dummyData/dummyGameState.json";

import drawStar from "../drawers/drawStar";

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

  const handleMouseDown = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    dragStart.current = [e.pageX, e.pageY];
    isDragging.current = true;
  };

  const handleMouseUp = (_e: ReactMouseEvent<HTMLCanvasElement>) => {
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

    if (context && canvasRef.current) {
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      dummyGameSate.stars.forEach((star) => {
        drawStar(
          star,
          context,
          globalXOffset.current,
          uncommitedGlobalXOffset.current,
          globalYOffset.current,
          uncommitedGlobalYOffset.current
        );
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
        style={{
          width: "100vw",
          height: "100vh",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default Home;
