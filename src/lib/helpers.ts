import { type Area } from "react-easy-crop";

function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = src;
  });
}

export async function getCroppedImage(
  imageSrc: string,
  crop: Area,
  rotation: number,
): Promise<string> {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.save();

  // Move canvas origin to center
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // Rotate image
  ctx.rotate((rotation * Math.PI) / 180);

  // Draw only the selected crop
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    -crop.width / 2,
    -crop.height / 2,
    crop.width,
    crop.height,
  );

  ctx.restore();

  return canvas.toDataURL("image/jpeg");
}
