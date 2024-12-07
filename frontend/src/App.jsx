import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null); // To store the uploaded file
  const [skills, setSkills] = useState(""); // To store user input skills
  const [fileName, setFileName] = useState(""); // For displaying the uploaded file name

  // Handle PDF upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setFileName(uploadedFile.name); // Save file name
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Handle skills input change
  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  // Function to search resumes based on skills
  const handleResumeSearch = () => {
    if (skills.trim() === "") {
      alert("Please enter skills to search.");
    } else {
      // Normally you would send this data to the backend for search
      alert(`Searching resumes for skills: ${skills}`);
    }
  };

  // Handle file submit (upload)
  const handleFileSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Sending file to backend
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="app-container">
      <h1>Resume Upload and Search</h1>

      <div className="option-container">
        {/* Option 1: Upload PDF */}
        <div className="upload-section">
          <h2>Upload Resume (PDF)</h2>
          <input 
            type="file" 
            accept="application/pdf"
            onChange={handleFileUpload} 
          />
          {file && <p>Uploaded File: {fileName}</p>}
          <button onClick={handleFileSubmit}>Submit PDF</button>
        </div>

        {/* Option 2: Select Resume based on Skills */}
        <div className="search-section">
          <h2>Search Resumes by Skills</h2>
          <input 
            type="text" 
            placeholder="Enter skills (e.g., React, JavaScript)" 
            value={skills}
            onChange={handleSkillsChange}
          />
          <button onClick={handleResumeSearch}>Search Resumes</button>
        </div>
      </div>
    </div>
  );
}

export default App;
