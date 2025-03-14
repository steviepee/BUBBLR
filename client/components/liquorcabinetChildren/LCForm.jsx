import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LCForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    ABV: 45,
    imageUrl: "",
    typeLiquor: "",
    amountLeft: 100.0,
    date: "2025-03-12",
    notes: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    setPreview(formData.imageUrl);
  }, [formData.imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "ABV" || name === "amountLeft" ? parseFloat(value) || 0 : value,
    }));
  };

  //  Image Upload: Updates state and sets preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // Show preview immediately
      setFormData((prevData) => ({
        ...prevData,
        imageUrl, // Store file preview URL
      }));
    }
  };

  //  Post Form Data
  const postForm = () => {
    const requestData = { body: formData };

    console.log("Submitting Data:", requestData); // ✅ Debugging log

    axios.post("/api/liquor", requestData)
      .then((response) => {
        console.log("Success:", response.data);

        navigate("/liquor");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Check console.");
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    postForm();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Bottle Information</h2>

      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Brand:
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
      </label>

      <label>
        ABV (%):
        <input type="number" name="ABV" value={formData.ABV} onChange={handleChange} step="0.1" />
      </label>

      <label>
        Upload Image:
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>

      <label>
        Or enter Image URL:
        <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
      </label>

      {preview && (
        <div style={styles.imagePreview}>
          <img src={preview} alt="Preview" style={styles.img} />
        </div>
      )}

      <label>
        Type of Liquor:
        <input type="text" name="typeLiquor" value={formData.typeLiquor} onChange={handleChange} required />
      </label>

      <label>
        Amount Left (%):
        <input type="number" name="amountLeft" value={formData.amountLeft} onChange={handleChange} step="0.1" required />
      </label>

      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>

      <label>
        Notes:
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Enter any notes here..." />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

// Styles
const styles = {

  imagePreview: {
    marginTop: "10px",
    textAlign: "center",
  },
  img: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default LCForm;
