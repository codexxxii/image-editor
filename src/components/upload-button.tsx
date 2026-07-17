import Dropzone, { type FileRejection } from "react-dropzone";
import { useContext } from "@/lib/use-context";
import { toast } from "sonner";

export default function UploadButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleImages, handleActiveImage } = useContext();

  function getImageDimensions(url: string) {
    return new Promise<{
      width: number;
      height: number;
    }>((resolve) => {
      const image = new Image();

      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };

      image.src = url;
    });
  }

  const onDropAccepted = async (files: File[]) => {
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const url = URL.createObjectURL(file);

        const dimensions = await getImageDimensions(url);

        return {
          id: crypto.randomUUID(),
          url,

          width: dimensions.width,
          height: dimensions.height,

          crop: {
            x: 0,
            y: 0,
          },

          zoom: 1,
          rotation: 0,

          printSize: {
            id: "4x6",
            width: 4,
            height: 6,
          },
        };
      }),
    );

    handleActiveImage(uploadedImages[0].url);
    handleImages(uploadedImages);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    toast.error(
      `File upload error, file type ${rejectedFiles[0].file.type} not supported.`,
    );
  };

  const accept = {
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
    "image/png": [".png"],
    "image/heic": [".heic"],
    "image/pdf": [".pdf"],
  };
  return (
    <>
      <Dropzone
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept={accept}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            {children}
          </div>
        )}
      </Dropzone>
    </>
  );
}
