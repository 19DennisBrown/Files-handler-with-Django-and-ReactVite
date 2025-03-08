import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Component
const Container = styled.div`
  @apply p-4 bg-gray-100 rounded-lg shadow-md;
`;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    // Check file size (2MB limit)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setUploadStatus('File size exceeds 2MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', selectedFile.name);  // Include the file name in the request

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/files/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) { // 201 Created is a common status code for successful uploads
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);

      // Display specific error message from the backend if available
      if (error.response && error.response.data && error.response.data.error) {
        setUploadStatus(`Error: ${error.response.data.error}`);
      } else {
        setUploadStatus('Failed to upload file. Please try again.');
      }
    }
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">File Upload</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-4 text-gray-700">{uploadStatus}</p>}
    </Container>
  );
};

export default FileUpload;