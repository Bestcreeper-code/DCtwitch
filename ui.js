let timeleft = 40;  

const events = [
    { "name": "heal", "description": "Restores the player's health" },
    { "name": "shield", "description": "Grants blocks to the player" },
    { "name": "givegold", "description": "Grants gold to the player" },
    { "name": "damage", "description": "Inflicts damage to the player" },
    { "name": "steal", "description": "Steals gold from the player" },
    { "name": "kill", "description": "Kills the player" },
];

document.addEventListener("DOMContentLoaded", function () {
    console.log("Extension settings UI loaded");
    document.body.style.backgroundImage = "url('https://i.ibb.co/WW6T2ZTQ/DCBackgound.png')";
    document.body.style.textAlign = "center";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.backgroundSize = "cover";

    const header = document.createElement("h1");
    header.innerText = "Choose an action";
    header.style.color = "yellow";
    header.style.fontSize = "28px";
    header.style.fontWeight = "bold";
    header.style.background = "black";
    header.style.padding = "10px";
    document.body.appendChild(header);

    const container = document.createElement("div");
    container.classList.add("container");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.gap = "40px";
    container.style.marginTop = "50px";
    document.body.appendChild(container);

    function createCard(placeholderText, cardNumber) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "300px";
        card.style.height = "400px";
        card.style.backgroundImage = "https://i.ibb.co/1YvxpZk6/DCcard.png";
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.style.borderRadius = "12px";
        card.style.border = "2px solid black";
        card.style.padding = "20px";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, 0.3)";

        const placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        placeholder.innerText = placeholderText;
        placeholder.style.fontSize = "24px";
        placeholder.style.color = "black";
        placeholder.style.marginBottom = "20px";
        card.appendChild(placeholder);

        const button = document.createElement("button");
        button.classList.add("select-btn");
        button.innerText = "Select";
        button.style.background = "#3498db";
        button.style.color = "white";
        button.style.padding = "10px 20px";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.fontSize = "18px";
        button.style.borderRadius = "5px";
        button.addEventListener("click", () => buttonClicked(placeholderText));

        button.addEventListener("mouseover", () => {
            button.style.background = "#2980b9";
        });
        button.addEventListener("mouseout", () => {
            button.style.background = "#3498db";
        });

        card.appendChild(button);
        container.appendChild(card);
    }

    socket.on("createcard", (choice1, choice2, serverTime) => {
        socket.emit("message", "yey");
        timeleft = serverTime || 40; 
        createCard(choice1, 1);
        createCard(choice2, 2);
        countdown(); 
    });

    function buttonClicked(choice) {
        socket.emit("choice", choice);
        const container = document.querySelector(".container");
        if (container) {
            container.innerHTML = "";
        }
    }

    async function countdown() {
        const header = document.querySelector("h1");
        if (header) {
            header.innerText = "Choose an action (" + timeleft + "s left)";
        }
        if (timeleft <= 0) {
            const container = document.querySelector(".container");
            if (container) {
                container.innerHTML = ""; 
            }
        } else {
            timeleft -= 1;
            setTimeout(countdown, 1000); 
        }
    }

    createCard("1", 1);
    createCard("2", 2);
});

Twitch.ext.onAuthorized((auth) => {
    ChannelId = auth.channelId;
    socket.emit("login", ChannelId, "viewer");
    window.alert("your channelId is:" + ChannelId);
});
