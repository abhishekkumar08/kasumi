import { useState } from "react";
import { FileText } from "lucide-react";
import { FileDropzone } from "../src/index.js";

export default {
  title: "Forms/FileDropzone",
  component: FileDropzone,
  args: {
    label: "Bank statement",
    description: "PDF or CSV, up to 10 MB",
    hint: "Password-protected PDFs are asked for on the next step.",
    accept: ".pdf,.csv",
    multiple: false,
    disabled: false,
    error: "",
  },
};

function WithSelection(args) {
  const [files, setFiles] = useState([]);
  return (
    <div className="max-w-lg">
      <FileDropzone {...args} onFiles={setFiles}>
        {files.length > 0 && (
          <span className="inline-flex items-center gap-1 text-caption text-fg">
            <FileText aria-hidden="true" className="h-4 w-4" />
            {files.map((f) => f.name).join(", ")}
          </span>
        )}
      </FileDropzone>
    </div>
  );
}

export const Playground = { render: (args) => <WithSelection {...args} /> };
export const Multiple = { args: { multiple: true, label: "Receipts", accept: "image/*", description: "JPG or PNG" }, render: (args) => <WithSelection {...args} /> };
export const Invalid = { args: { error: "That file is over 10 MB." }, render: (args) => <WithSelection {...args} /> };
