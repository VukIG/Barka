import { useState } from "react";
import { Upload, X } from "lucide-react";

function ImageUpload({ onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB.");
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const clear = () => {
    setPreview(null);
    setFileName("");
    onFileSelect(null);
  };

  return (
    <div className="w-full mb-5">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-colors">
        <Upload className="w-6 h-6 text-gray-400" />
        <span className="text-sm text-gray-600">
          {fileName || "Click to choose an image"}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {preview && (
        <div className="mt-3 relative w-fit">
          <img
            src={preview}
            alt="Preview"
            className="h-32 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={clear}
            className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1 text-gray-600 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
