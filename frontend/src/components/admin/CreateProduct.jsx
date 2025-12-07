import React, { useState } from "react";
import axios from "axios";

export default function CreateProductModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    tags: "",
    isFeatured: false,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => formData.append("images", img));

      const res = await axios.post(
        "http://localhost:5000/api/admin/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (onSave) onSave(res.data.product);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-3xl relative">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4">Create Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <div className="flex gap-2 items-center">
            <input type="checkbox" name="isFeatured" onChange={handleChange} />
            <label>Featured Product</label>
          </div>

          <div>
            <label className="font-medium mb-1">Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="block"
            />

            {images.length > 0 && (
              <ul className="text-sm mt-2">
                {images.map((img, i) => (
                  <li key={i}>📄 {img.name}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
