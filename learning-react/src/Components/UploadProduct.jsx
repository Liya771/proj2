import { useState } from "react";
import axios from "axios";
import "./UploadProducts.css";

const UploadProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("contact", contact);
    formData.append("image", imageFile);

    const token = localStorage.getItem("token"); // 👈 get the JWT token

    if (!token) {
      alert("You must be logged in to upload a product.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // 👈 attach token
          },
        }
      );

      alert("Product uploaded successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setContact("");
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Contact:</label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" width="200px" />
          </div>
        )}

        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
};

export default UploadProduct;
