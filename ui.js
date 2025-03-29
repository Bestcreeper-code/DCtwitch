//ui.js
let Channel_Id = "-1";
let timeleft = 40;  
let curr_votes ;



document.addEventListener("DOMContentLoaded", function () {
    console.log("Extension settings UI loaded");
    document.body.style.backgroundImage = 'https://i.ibb.co/WW6T2ZTQ/DCBackgound.png';
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

    function createCard(placeholderText,description, cardNumber) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "300px";
        card.style.height = "400px";
        card.style.backgroundImage = "url('https://i.ibb.co/WW6T2ZTQ/DCBackgound.png')";
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

        const description = document.createElement("div");
        description.classList.add("description");
        description.innerText = description;
        description.style.fontSize = "18px";
        description.style.color = "black";
        description.style.marginBottom = "20px";
        card.appendChild(description);

        const image = document.createElement("img");
        image.src = `.//images/${placeholderText.toLowerCase().replace(" ", "-")}.png`;

        image.style.minWidth = "100px";
        image.style.minHeight = "100px";
        image.style.maxWidth = "150px";
        image.style.maxHeight = "150px";
        card.appendChild(image);

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
    const body = document.body;

    socket.on("createcard", (choice1, choice1desc, choice2, choice2desc, serverTime) => {
        socket.emit("message", "yey");
        timeleft = serverTime || 40; 
        document.body.style.backgroundImage = "url('https://i.ibb.co/WW6T2ZTQ/DCBackgound.png')";
        toggleOverlayVisibility(true);
        container.innerHTML = "";
        createCard(choice1, choice1desc, 1);
        createCard(choice2, choice2desc, 2);
        countdown(); 
    });

    

    socket.on("updatevotes", (votes) => {
        curr_votes = votes;
    });


function buttonClicked(choice) {
    socket.emit("choice", choice, Channel_Id);
    const container = document.querySelector(".container");
    container.innerHTML = "";
    toggleOverlayVisibility(false);
}

function toggleOverlayVisibility(show) {
    const body = document.body;
    const header = document.querySelector("h1");
    const container = document.querySelector(".container");

    if (show) {
        body.style.opacity = "1";
        header.style.visibility = "visible";
        body.style.pointerEvents = "auto";
        container.style.display = "flex";
        document.body.style.backgroundImage = "url('https://i.ibb.co/WW6T2ZTQ/DCBackgound.png')";
    } else {
        body.style.opacity = "0";
        header.style.visibility = "hidden";
        body.style.pointerEvents = "none";
        container.style.display = "none";
        body.style.backgroundImage = "none";
    }
}
    

async function countdown() {
    socket.emit("message", timeleft);
    if (header) {
        let result = Object.entries(curr_votes)
            .map(([key, value]) => `${key}:${value}`)
            .join(' ');
        header.innerText = "Choose an action (" + timeleft + "s left)\n Votes: " + JSON.stringify(result);
    }
    if (timeleft <= 0) {
        const container = document.querySelector(".container");
        if (container) {
            container.innerHTML = ""; 
            toggleOverlayVisibility(false);
        }
        socket.emit("message", "timeout");
        
        return; 
    }
    
    timeleft -= 1;
    setTimeout(countdown, 1000);
}


});

Twitch.ext.onAuthorized((auth) => {
    Channel_Id = auth.channelId;
    socket.emit("login", Channel_Id, "viewer");
});
