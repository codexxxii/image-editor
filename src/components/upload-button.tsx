import Dropzone, { type FileRejection } from "react-dropzone";
import { useContext } from "@/lib/use-context";
import { toast } from "sonner";

export default function UploadButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleImages } = useContext();

  const onDropAccepted = (acceptedFiles: File[]) => {
    const images = acceptedFiles.map((image) => {
      const data = {
        id: crypto.randomUUID(),
        url: URL.createObjectURL(image),
      };
      return data;
    });
    handleImages(images);
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
