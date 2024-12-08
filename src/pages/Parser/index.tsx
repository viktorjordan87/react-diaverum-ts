import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { parseTextToArray } from "@/utils/parseTextToArray";
import { Button, Table } from "antd";
import { toast } from "react-hot-toast";
import { set } from "zod";

export const Parser = () => {
  //File upload state
  const [files, setFiles] = useState<File[]>([]);
  //medical results state
  const [results, setResults] = useState<object[]>([]);
  //error state
  const [isError, setIsError] = useState(false);

  // Handle file updates
  const handleFileUpdate = (updatedFiles: File[]) => {
    setFiles(updatedFiles);

    // Parse the file contents
    if (updatedFiles.length > 0) {
      parseTextFile(updatedFiles[0]); // Call the parse function for the first file
    }
  };

  // Parse single file
  const parseTextFile = async (file: File) => {
    //build in file reader in the browser
    const reader = new FileReader();

    return new Promise<string>((resolve, reject) => {
      // Handle successful file read
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        resolve(fileContent);
      };

      // Handle file read error
      reader.onerror = () => {
        console.error(`Error reading file: ${file.name}`);
        reject(`Failed to parse the file: ${file.name}`);
      };

      // Read the file as text
      reader.readAsText(file);
    })
      .then((fileContent) => {
        // Process the file content using parseTextToArray utility function
        const arrayOfObjects = parseTextToArray(fileContent);
        setResults(arrayOfObjects); // Set parsed results to state
      })
      .catch((error) => {
        console.error("Error parsing file:", error);
        setIsError(true); // Set error state if file parsing fails
      });
  };

  /* Create Columns */
  const columns =
    results.length > 0
      ? Object.keys(results[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }))
      : [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 1: File Upload</h2>
      <FileUpload
        field="file-upload"
        title="Upload .txt Files"
        files={files}
        setFiles={handleFileUpdate}
        formatText=".txt"
        acceptedFileTypes={["text/plain"]}
        maxFileSize="2MB"
        maxFiles={1}
        allowMultiple={false}
        req
      />
      {results.length > 0 && files.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Step 2: Content of the File
          </h2>
          <Table
            dataSource={results}
            columns={columns}
            className="overflow-auto"
          />
          {isError && <p className="text-red-500">Error parsing file(s)</p>}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Step 3: Upload Results
          </h2>
          <Button
            type="primary"
            className="mb-20"
            onClick={() => {
              console.log("Upload Results to Backend");
              toast.success("Results uploaded successfully");
              setResults([]); // Clear results after upload
              setFiles([]); // Clear files after upload
              setIsError(false); // Reset error state
            }}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
};
