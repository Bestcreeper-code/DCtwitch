//client.js
// Import the socket.io-client library


// Connect to the server (replace with your server URL)
const socket = io("http://localhost:3000");

window.socket = socket;
// Handle connection event
socket.on("connect", () => {
    console.log("Connected to server with ID: ", socket.id);
});



// Receive messages from the server
socket.on("message", (message) => {
    console.log("Message received from server: ", message);
});

// Handle disconnection
socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
