import { useState } from "react";
import "./imageupload.css";

export default function ImageUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
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
          body: formData
        }
      );

      const data = await res.json();

      setImageUrl(data.secure_url);
      onUpload(data.secure_url); // 🔥 send to parent

    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    alert("✅ Link copied!");
  };

  return (
    <div className="upload-box">
      <label className="file-btn">
        📷 Choose Image
        <input type="file" accept="image/*" onChange={handleSelect} hidden />
      </label>

      {preview && <img src={preview} className="preview-img" />}

      <button onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

     
    </div>
  );
}