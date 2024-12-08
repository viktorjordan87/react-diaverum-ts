import "./index.scss";
import { FilePond, registerPlugin, FilePondProps } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Register the plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

// Define the props interface
interface FileUploadProps extends FilePondProps {
  field: string; // The id of the input field
  title: string; // The label for the input field
  files: File[]; // The current files state
  setFiles: (files: File[]) => void; // The function to update the files
  formatText?: string; // Description of accepted file format
  req?: boolean; // Whether the field is required
  maxFileSize?: string; // The maximum file size (default is set in the component)
  maxFiles?: number; // The maximum number of files (default is set in the component)
  allowMultiple?: boolean; // Whether to allow multiple files (default is set in the component)
}

const FileUpload = ({
  field,
  title,
  files,
  setFiles,
  formatText = "",
  ...props
}: FileUploadProps) => {
  return (
    <div className="file-upload">
      <label htmlFor={field} className="font-semibold">
        {title}
        {props?.req && "*"}
      </label>
      <FilePond
        {...props}
        files={files}
        onupdatefiles={(fileItems) =>
          setFiles(fileItems.map((item) => item.file as File))
        }
        allowMultiple={true}
        maxFiles={props?.maxFiles || 1} // Adjust maximum files here
        maxFileSize={props?.maxFileSize || "10240KB"}
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle="Drag & Drop your files or <span class='filepond--label-action'>Browse</span>"
      />
      <small className="field-help">
        <span>
          File format is: {formatText}, max {props?.maxFileSize || "10240KB"}.
        </span>
      </small>
    </div>
  );
};

export { FileUpload };
