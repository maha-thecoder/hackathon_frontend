// src/chatbot/ImageUpload.jsx

import { useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return alert("Select image first");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sarekart");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmgitvkke/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      // 🔥 send URL to parent
      onUpload(data.secure_url);

    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleSelect} />
      <button onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}