let ChannelId = " Loading...";
Twitch.ext.onAuthorized((auth) => {
    ChannelId = auth.channelId;
    socket.emit("settings",ChannelId,/*settings:*/Twitch.ext.configuration.broadcaster.content);
});
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("config-form");
    const setting1Input = document.getElementById("setting1");
    const setting3Input = document.getElementById("setting3");

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
        const setting3 = setting3Input.value;
        
        Twitch.ext.configuration.set("broadcaster", "1", JSON.stringify({ 
            goldchanges: setting1,
            choicemode: setting2,
            choice_timer: setting3 || 120
        }));
    });
    
    document.getElementById("channel-id-txt").innerHTML = "Channel ID: " + ChannelId;
});
