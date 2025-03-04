document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("config-form");
    const setting1Input = document.getElementById("setting1");
    const setting2Input = document.getElementById("setting2");

    const dropdown = document.createElement("select");
    dropdown.id = "setting2";
    const options = ["Bad", "Neutral", "Good"];
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.innerText = option;
        dropdown.appendChild(optionElement);
    });
    const setting2Container = document.getElementById("setting2-container");
    setting2Container.appendChild(dropdown);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const setting1 = setting1Input.checked ? "Enabled" : "Disabled";
        const setting2 = dropdown.value;
        
        Twitch.ext.configuration.set("broadcaster", "1", JSON.stringify({ 
            goldchanges: setting1,
            choicemode: setting2
        }));
    });
    
});
Twitch.ext.onAuthorized((auth) => {
    ChannelId = auth.channelId;
    socket.emit("settings",ChannelId,/*settings:*/Twitch.ext.configuration.broadcaster.content);
});
