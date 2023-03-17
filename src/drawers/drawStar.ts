import Star from "../types/Star";

const drawStar = (
  star: Star,
  context: CanvasRenderingContext2D,
  globalXOffset: number,
  uncommittedGlobalXOffset: number,
  globalYOffset: number,
  uncommittedGlobalYOffset: number,
  zoom: number
): void => {
  const starXOnScreenPos =
    ((star.x + 5000) / 3 + globalXOffset + uncommittedGlobalXOffset) * zoom;
  const starYOnScreenPos =
    ((star.y + 5000) / 3 + globalYOffset + uncommittedGlobalYOffset) * zoom;

  if (star.radius > 25) {
    context.strokeStyle = "black";
    context.fillStyle = "black";
  } else {
    const red = 255 * (1 - star.radius / 10);
    const blue = 255 * (star.radius / 10);
    const green = 255 * (1 - star.radius / 20);

    context.strokeStyle = `rgb(${red},${green},${blue})`;
    context.fillStyle = `rgb(${red},${green},${blue})`;
  }

  context.beginPath();
  context.arc(
    starXOnScreenPos,
    starYOnScreenPos,
    (star.radius / 4) * zoom,
    0,
    2 * Math.PI
  );
  context.stroke();
  context.fill();
  context.closePath();
};

export default drawStar;
