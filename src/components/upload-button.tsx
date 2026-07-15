import Dropzone, { type FileRejection } from "react-dropzone";

export default function UploadButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const onDropAccepted = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    console.log(rejectedFiles);
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
