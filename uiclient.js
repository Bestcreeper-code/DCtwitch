    const socket = io("twitch-ext-ser-production.up.railway.app", {
        path: "/socket.io/",
        transports: ["websocket", "polling"],
    });

    window.socket = socket;

    socket.on("connect", () => {
        console.log("Connected to server with ID: ", socket.id);
        socket.emit("fetchevents");
    });

    socket.on("message", (message) => {
        console.log("Message received from server: ", message);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });
