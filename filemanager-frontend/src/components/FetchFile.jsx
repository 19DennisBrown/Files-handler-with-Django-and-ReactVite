import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Component
const Container = styled.div`
  @apply p-4 bg-gray-100 rounded-lg shadow-md;
`;

const FetchFile = () => {
  const [files, setFiles] = useState([]);  // State to store fetched files
  const [loading, setLoading] = useState(true);  // State to handle loading state
  const [error, setError] = useState('');  // State to handle errors

  // Fetch all files when the component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/files/list/');
      setFiles(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to fetch files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>

      {loading ? (
        <p className="text-gray-700">Loading files...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : files.length === 0 ? (
        <p className="text-gray-700">No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id} className="mb-2 p-2 bg-white rounded shadow">
              <span className="font-medium">{file.name}</span> -{' '}
              <a
                href={file.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default FetchFile;