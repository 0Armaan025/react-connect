// Files.jsx

import React, { useState, useEffect } from "react";
import CodeEditor from "../../screens/Editor/Editor";
import "./files.css"; // Import the CSS file with the styles

const Files = () => {
  const [fileContent, setFileContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);

  async function getFileContent(filePath) {
    const owner = 'bishalbera';
    const repo = 'Parko';
    const branch = 'master';
    const accessToken = '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';
  
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const headers = { 'Authorization': `token ${accessToken}` };
  
    const response = await fetch(url, { headers });
  
    if (!response.ok) {
      throw new Error('Error fetching file content');
    }
  
    const fileData = await response.json();
  
    if (fileData.encoding === 'base64' && fileData.type === 'file') {
      return atob(fileData.content);
    } else {
      throw new Error('Invalid file format');
    }
  }

  const fetchFiles = async () => {
    try {
      const owner = 'bishalbera';
      const repo = 'Parko';
      const branch = 'master';
      const accessToken = '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';
      const url = `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;
      const headers = { 'Authorization': `token ${accessToken}` };
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error('Error fetching file list');
      }

      const filesData = await response.json();
      // Filter out folders from the files data
      const filteredFiles = filesData.filter(file => file.type === 'file');
      setFiles(filteredFiles);
    } catch (error) {
      console.error('Error fetching file list:', error);
      setError('Error fetching file list. Please try again later.');
    }
  };

  const fetchFileContent = async (filePath) => {
    setIsLoading(true);
    setError(null);

    try {
      const content = await getFileContent(filePath);
      setFileContent(content);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching file content:', error);
      setError('Error fetching file content. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleFileClick = async (filePath) => {
    await fetchFileContent(filePath);
  };

  const handleRefreshFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await fetchFiles();
    } catch (error) {
      setError('Error refreshing file list. Please try again later.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Files Sidebar</h1>
        <button onClick={handleRefreshFiles}>Refresh Files</button>
        {error && <p className="error">{error}</p>}
        <ul>
          {files.map((file, index) => (
            <li key={index} onClick={() => handleFileClick(file.path)}>
              {file.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="editor">
        <h1>File Content:</h1>
        {isLoading ? (
          <p className="loading">Loading file content...</p>
        ) : (
          <CodeEditor userCode={fileContent} />
        )}
      </div>
    </div>
  );
};

export default Files;
