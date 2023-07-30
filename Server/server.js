const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const prettier = require("prettier"); // Import Prettier (if you haven't already)

const app = express();
const httpServer = http.createServer(app);
// const io = socketIO(server); // Assign 'io' to the Socket.IO instance

const io = new socketIO.Server(httpServer, {
  cors: {
    origin: "*"
  }
});


const PORT = process.env.PORT || 3001;

let codeVersions = []; // Store code versions in memory (replace this with a database)
let code = ""; // Store code 

// enabling CORS for some specific origins only for all https requests
// let corsOptions = {
//   origin : ['*'],
// }

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Socket.IO handling for real-time communication
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle code synchronization
  socket.on("codeChange", (newCode) => {
    // Broadcast the new code to all connected clients except the sender
    code = newCode;
    console.log("Received code:", newCode);
    console.log("Whole code:", code);
    socket.broadcast.emit("codeChange", code);
  });

  // Handle chat messages
  socket.on("chatMessage", (message) => {
    // Broadcast the chat message to all connected clients, including the sender
    io.emit("chatMessage", message);
  });

  // Handle video conferencing
  // (You'll need to implement additional logic for WebRTC video streaming)

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

app.post("/api/saveCodeVersion", (req, res) => {
  const { code } = req.body;
  const timestamp = Date.now();
  try { codeVersions.push({ timestamp, code }); } catch (error) {
    console.error("Error formatting code:", error);
  }

  res.status(200).json({ message: "Code version saved successfully" });
});

app.post("/api/formatCode", (req, res) => {
  const { code } = req.body;
  console.log("Received code:", code);
  try {
    // Format the code using Prettier (synchronously)
    prettier
      .format(code, { parser: "babel" })
      .then((formattedCode) => {
        console.log("Formatted code:", formattedCode);

        // Respond with the formatted code as a string
        res.status(200).send(formattedCode);
      })
      .catch((error) => {
        console.error("Error formatting code:", error);
        res.status(500).json({ error: "Syntax error occurred. Please check your code and try again." });
      });
  } catch (error) {
    console.error("Error formatting code:", error);
    res.status(500).json({ error: "Syntax error occurred. Please check your code and try again." });
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
