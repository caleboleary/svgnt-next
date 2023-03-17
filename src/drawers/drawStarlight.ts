import Star from "../types/Star";

const drawStarlight = (
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

  const gradient = context.createRadialGradient(
    starXOnScreenPos,
    starYOnScreenPos,
    1,
    starXOnScreenPos,
    starYOnScreenPos,
    star.radius * 20 * zoom
  );

  const red = 255 * (1 - star.radius / 10);
  const blue = 255 * (star.radius / 10);
  const green = 255 * (1 - star.radius / 20);

  gradient.addColorStop(
    0,
    `rgba(${red},${green},${blue},${0.003 * star.radius})`
  );
  gradient.addColorStop(0.9, `rgba(${red},${green},${blue},0)`);

  if (star.radius < 25) {
    context.fillStyle = gradient;
  } else {
    //transparent
    context.fillStyle = "rgba(0,0,0,0)";
  }

  context.beginPath();
  context.arc(
    starXOnScreenPos,
    starYOnScreenPos,
    star.radius * 50 * zoom,
    0,
    2 * Math.PI
  );
  context.fill();
  //clear out fillstyle
  context.fillStyle = "black";
  context.closePath();
};

export default drawStarlight;
