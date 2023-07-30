import React, { useState, useEffect } from "react";
import Split from "react-split";
import './splitcontainer.css';
import axios from "axios";
import CodeEditor from "../../screens/Editor/Editor";
import NavBar from "../navbar/Navbar";

const Files = ({ files, onFileClick }) => {
  return (
    <>
    <NavBar/>
    <div className="files">
      <h2>Files:</h2>
      <ul>
        {files.map((file, index) => (
          <li
            key={index}
            onClick={() => (file.type === 'dir' ? onFileClick(file.path) : onFileClick(file.path))}
            className={file.type === 'dir' ? 'folder' : ''}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

const SplitContainer = ({ isSidebarCollapsed }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const getFileContent = async (filePath) => {
    const owner = 'bishalbera';
    const repo = 'Parko';
    const branch = 'master';
    const accessToken = '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';

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const headers = {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3.raw', // Request raw content directly
    };

    try {
      const response = await axios.get(url, { headers });

      // 'data' will contain the content of the file
      return response.data;
    } catch (error) {
      console.error('Error fetching file content:', error);
      throw new Error('Error fetching file content');
    }
  };

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
      // Filter out files and folders separately
      const files = filesData.filter(item => item.type === 'file');
      const folders = filesData.filter(item => item.type === 'dir');
      setFiles([...folders, ...files]); // Merge folders and files arrays
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const handleFileClick = async (filePath) => {
    try {
      if (files.find(file => file.path === filePath)?.type === 'dir') {
        // If the clicked item is a folder, fetch its contents
        const accessToken = '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';
        const response = await axios.get(filePath, { headers: { 'Authorization': `token ${accessToken}` } });

        if (!response.ok) {
          throw new Error('Error fetching folder contents');
        }

        const folderContents = await response.data;
        // Filter out files and folders separately
        const filesInFolder = folderContents.filter(item => item.type === 'file');
        const foldersInFolder = folderContents.filter(item => item.type === 'dir');

        // Combine the current folder's files and sub-folders and update the state
        setFiles([...filesInFolder, ...foldersInFolder]);
      } else {
        // If the clicked item is a file, fetch its content
        const content = await getFileContent(filePath);
        setSelectedFile(content);
      }
    } catch (error) {
      console.error('Error fetching file/folder content:', error);
      setSelectedFile(null); // Set selectedFile to null in case of error
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const splitSizes = isSidebarCollapsed ? [0, 100] : [15, 85];

  return (
    <div className="splitContainer">
      <Split
        className="container"
        sizes={splitSizes}
        minSize={0}
        expandToMin={false}
        gutterSize={5}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <Files files={files} onFileClick={handleFileClick} />
        {selectedFile !== null ? (
          <CodeEditor content={selectedFile} />
        ) : (
          <div className="codeEditor">Select a file to view its content</div>
        )}
      </Split>
    </div>
  );
};

export default SplitContainer;
