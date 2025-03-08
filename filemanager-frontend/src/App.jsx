// import React from 'react';
import './index.css'


import React, { useState } from 'react';
// import FileUpload from './FileUpload';
import FileList from './components/FileList';
import FetchFile from './components/FetchFile';

const App = () => {
  const [refreshFiles, setRefreshFiles] = useState(false);

  const handleUploadSuccess = () => {
    setRefreshFiles((prev) => !prev);  // Toggle state to trigger re-fetch
  };

  return (
    <div className="p-8">
      <FileList onUploadSuccess={handleUploadSuccess} />
      <div className="mt-8">
        <FetchFile key={refreshFiles} />  {/* Re-render FetchFile when refreshFiles changes */}
      </div>
    </div>
  );
};

export default App;