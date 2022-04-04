import type Star from "../types/Star";

const drawStarlight = (
  star: Star,
  context: CanvasRenderingContext2D,
  globalXOffset: number,
  uncommitedGlobalXOffset: number,
  globalYOffset: number,
  uncommitedGlobalYOffset: number
): void => {
  //   context.fillStyle = `rgba(255,255,255,${0.0005 * star.radius})`;

  const starXOnScreenPos =
    (star.x + 5000) / 3 + globalXOffset + uncommitedGlobalXOffset;
  const starYOnScreenPos =
    (star.y + 5000) / 3 + globalYOffset + uncommitedGlobalYOffset;

  const gradient = context.createRadialGradient(
    starXOnScreenPos,
    starYOnScreenPos,
    1,
    starXOnScreenPos,
    starYOnScreenPos,
    star.radius * 20
  );

  gradient.addColorStop(0, `rgba(255,255,255,${0.001 * star.radius})`);
  gradient.addColorStop(0.9, `rgba(255,255,255,0)`);

  context.fillStyle = gradient;

  context.beginPath();
  context.arc(
    starXOnScreenPos,
    starYOnScreenPos,
    star.radius * 50,
    0,
    2 * Math.PI
  );
  context.fill();
  context.closePath();
};

export default drawStarlight;
