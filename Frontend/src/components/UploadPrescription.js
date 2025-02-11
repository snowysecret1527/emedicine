import React, { useState } from "react";
import axios from "axios";


const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8081/api/prescription/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(
        error.response && error.response.data
          ? "File upload failed: " + error.response.data
          : "File upload failed. Please try again."
      );
      console.error("Error during file upload:", error);  // Log the full error for debugging
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Upload Prescription</h2>
      <form onSubmit={handleUpload}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPrescription;
