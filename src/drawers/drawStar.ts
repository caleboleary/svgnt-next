import type Star from "../types/Star";

const drawStar = (
  star: Star,
  context: CanvasRenderingContext2D,
  globalXOffset: number,
  uncommitedGlobalXOffset: number,
  globalYOffset: number,
  uncommitedGlobalYOffset: number
): void => {
  context.strokeStyle = "white";
  context.fillStyle = "white";

  context.beginPath();
  context.arc(
    (star.x + 5000) / 3 + globalXOffset + uncommitedGlobalXOffset,
    (star.y + 5000) / 3 + globalYOffset + uncommitedGlobalYOffset,
    star.radius / 4,
    0,
    2 * Math.PI
  );
  context.stroke();
  context.fill();
  context.closePath();
};

export default drawStar;
