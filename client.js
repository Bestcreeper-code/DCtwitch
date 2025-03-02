//client.js
const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to server with ID: ", socket.id);
    socket.emit("setType", "Ui");
});

socket.on("hide", () => {
    if (window.Twitch && window.Twitch.ext) {
        window.Twitch.ext.actions.requestClose();  
    }
   document.close();
});

socket.on("CreateChoice",(card1txt,card2txt) => { 
    createCard(card1txt, 1);
    createCard(card2txt, 2);
}); 

socket.on("show", () => {
    if (window.Twitch && window.Twitch.ext) {
        window.Twitch.ext.actions.requestOpen();  
    }
   document.open();
});
window.sendMessage = function(message) {
    socket.emit("message", message);
};

socket.on("message", (message) => {
    console.log("Message received from server: ", message);
});

socket.on("disconnect", () => {
    
    console.log("Disconnected from server");
});

if (window.Twitch && window.Twitch.ext) {
    window.Twitch.ext.actions.requestOpen();  
}