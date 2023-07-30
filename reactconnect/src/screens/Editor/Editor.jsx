import React, { useState, useEffect } from "react";
import io from "socket.io-client"; // Import the Socket.IO client library
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import 'prismjs/components/prism-clike';
import "prismjs/components/prism-javascript";
import axios from "axios";
import "prismjs/themes/prism-okaidia.css";
import "./editor.css";
const socket = io("http://localhost:3001"); // Connect to the Socket.IO server

const CodeEditor = () => {
  const [code, setCode] = useState("");

  // Emit code changes to the backend when 'code' state changes

  const handleCodeChange = (newCode) => {
    console.log("New code:", newCode);
    setCode(newCode);
    socket.emit("codeChange", newCode);
    socket.on("codeChange", (newCode) => {
      setCode(newCode);
    });
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server!");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server!");
    });

    // socket.emit("codeChange", code);
    socket.on("codeChange", (newCode) => {
      setCode(newCode);
    });
  }, [code]);

  const formatCode = () => {
    axios
      .post("http://localhost:3001/api/formatCode", { code })
      .then((response) => {
        console.log("Server response:", response.data); // Add this line to check the response data
        const formattedCode = response.data;
        console.log("Formatted code:", formattedCode);
        setCode(formattedCode); // Add this line to check the formatted code
      })
      .catch((error) => {
        console.error("Error formatting code:", error);
      });
  };

  const handleSaveCodeVersion = () => {
    // Make a POST request to save the code version in the backend
    axios
      .post("http://localhost:3001/api/saveCodeVersion", { code })
      .then((response) => {
        console.log(response.data.message); // The server response message
        setCode(code);
      })
      .catch((error) => {
        console.error("Error saving code version:", error);
      });
  };

  return (
    <div>
      <div className="container_editor_area">
        <Editor
          value={code}
          onValueChange={(code) => handleCodeChange(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
      <button onClick={handleSaveCodeVersion}>Save Code Version</button>
      <button onClick={formatCode}>Format Code</button>
    </div>
  );
};

export default CodeEditor;